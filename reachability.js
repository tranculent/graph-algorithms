const readline = require('readline');

function reach (adjList, x, y) {
    let visited = new Set();

    function dfs (v) {
        if (visited.has(v)) return;
        visited.add(v);

        for (let neighbor of adjList[v]) {
            dfs(neighbor);
        }
    }

    dfs(x);
    return visited.has(y) ? 1 : 0;
}


// Main program
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

let res = [];
let n, m; // Declare n and m outside for global access
rl.on('line', (line) => {
    res.push(line.trim());

    // Parse n and m once we get the first line of input
    if (res.length === 1) {
        [n, m] = res[0].split(' ').map(Number);
    }

    // Stop reading input once we've received n + m + 1 lines (the first line, m edge lines, and one query line)
    if (res.length === m + 2) {
        rl.close();
    }
}).on('close', () => {
    let adj = Array.from({ length: n }, () => []);

    // Build the adjacency list
    for (let i = 1; i <= m; i++) {
        let [x, y] = res[i].split(' ').map(Number);
        console.log([x, y]);
        adj[x - 1].push(y - 1);
        adj[y - 1].push(x - 1);
    }

    // Get the x and y for reachability query
    let [x, y] = res[m + 1].split(' ').map(Number);

    // Call the reach function and print the result
    console.log(reach(adj, x - 1, y - 1));
});