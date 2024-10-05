function acyclic(adj) {
    const visited = new Set();
    const cycle = new Set();

    function dfs(node) {
        if (cycle.has(node)) return false;
        if (visited.has(node)) return true;

        visited.add(node);
        cycle.add(node);

        for (const n of adj[node]) {
            if (!dfs(n)) return false;
        }

        cycle.delete(node);
        return true;
    }

    for (let i = 0; i < adj.length; i++) {
        if (!dfs(adj[i])) return true;
    }

    return false;
}

function main() {
const input = prompt("").split(" ");
const n = parseInt(input[0], 10);
const m = parseInt(input[1], 10);

// Initialize adjacency list
const adj = Array.from({ length: n }, () => []);

for (let i = 0; i < m; i++) {
    const edge = prompt(``).split(" ");
    const x = parseInt(edge[0], 10);
    const y = parseInt(edge[1], 10);
    adj[x - 1].push(y - 1);
}

console.log(acyclic(adj));
}

// Run the main function
main();
