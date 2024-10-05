const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function acyclic(adj) {
    const visited = Array(adj.length).fill(false);
    const cycle = Array(adj.length).fill(false);;

    function _dfs(v) {
        if (cycle[v]) return true;
        if (visited[v]) return false;

        visited[v] = true;
        cycle[v] = true;

        for (const neighbor of adj[v]) {
            if (_dfs(neighbor)) return true;
        }

        cycle[v] = false;
        return false;
    }

    for (let i = 0; i < adj.length; i++) {
        if (_dfs(i)) return true;
    }

    return false;
}

function dfs(adj, used, order, x) {
    used[x] = true;

    for (const neighbor of adj[x]) {
        if (!used[neighbor])
            dfs(adj, used, order, neighbor);
    }

    order.push(x);
}

function toposort(adj) {
    const used = new Array(adj.length).fill(false);
    const order = [];
    
    for (let i = 0; i < adj.length; i++) {
        if (!used[i]) {
            dfs(adj, used, order, i);
        }
    }

    return order.reverse(); // Return the topological order in reverse
}

function main() {
    rl.question("", (input) => {
        const [n, m] = input.split(" ").map(Number);

        // Initialize adjacency list
        const adj = Array.from({ length: n }, () => []);

        let edgesEntered = 0;

        function readEdge() {
            if (edgesEntered < m) {
                rl.question(``, (edgeInput) => {
                    const [x, y] = edgeInput.split(" ").map(Number);
                    adj[x - 1].push(y - 1);
                    edgesEntered++;
                    readEdge(); // Recursively read the next edge
                });
            } else {
                if (!acyclic(adj)) {
                    const order = toposort(adj);
                    console.log(order.map(i => i + 1).join(" "));
                } else {
                    console.log('Graph is not acyclic!');
                }
                rl.close();
            }
        }

        readEdge(); // Start reading edges
    });
}

// Run the main function
main();
