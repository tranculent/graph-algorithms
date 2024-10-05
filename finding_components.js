const readline = require('readline');

// Function to count the number of connected components (incomplete)
function number_of_components(adj) {
    let res = 0;
    let visited = new Set();

    function dfs(v) {
        if (visited.has(v)) return;
        visited.add(v);
        for (let neighbor of adj[v]) dfs(neighbor);
    }
    
    for (let v = 0; v < adj.length; v++) {
        if (!visited.has(v)) {
            res++;
            dfs(v);
        }
    }

    return res;
}

// Main program
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let res = [];
rl.on('line', (line) => {
    res.push(line.trim());

    const [n, m] = res[0].split(' ').map(Number);

    // Stop reading input once we've received all the edges
    if (res.length === m + 1) {
        rl.close();
    }
}).on('close', () => {
    let [n, m] = res[0].split(' ').map(Number);
    let adj = Array.from({ length: n }, () => []);

    // Fill the adjacency list
    for (let i = 1; i <= m; i++) {
        let [x, y] = res[i].split(' ').map(Number);
        adj[x - 1].push(y - 1);
        adj[y - 1].push(x - 1);
    }

    // Call the number_of_components function
    console.log(number_of_components(adj));
});
