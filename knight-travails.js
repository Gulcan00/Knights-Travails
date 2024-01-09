function createGraph() {
    const BOARD_SIZE = 8;
    const possibleMoves = [[1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];

    function initializeGraph() {
        const arr = [];
        for (let x = 0; x < BOARD_SIZE; x++) {
            arr[x] = [];
            for (let y = 0; y < BOARD_SIZE; y++) {
                const moves = [];

                for (let move of possibleMoves) {
                    const newX = x + move[0];
                    const newY = y + move[1];

                    if ((newX >= 0 && newX < BOARD_SIZE) && (newY >= 0 && newY < BOARD_SIZE)) {
                        moves.push([newX, newY]);
                    }
                }
                arr[x][y] = moves;
            }
        }

        return arr;
    }

    const graph = initializeGraph();

    function printPath(bfsInfo, x, y, step = 0) {
        if (bfsInfo[x][y].distance === 0) {
            console.log(`You made it in ${step} moves!  Here's your path:`);
        } else {
            printPath(bfsInfo, bfsInfo[x][y].predecessor[0], bfsInfo[x][y].predecessor[1], step + 1);
        }

        console.log(`[${x}, ${y}]`);
    }

    function knightMoves(start, end) {
        const bfsInfo = [];

        for (let x = 0; x < BOARD_SIZE; x++) {
            bfsInfo[x] = [];
            for (let y = 0; y < BOARD_SIZE; y++) {
                bfsInfo[x][y] = {
                    distance: null,
                    predecessor: null
                }
            }
        }

        bfsInfo[start[0]][start[1]].distance = 0;

        const queue = [];
        queue.push(start);

        outer: while (queue.length > 0) {
            const u = queue.shift();
            const [x, y] = u;
            for (let v of graph[x][y]) {
                const [newX, newY] = v;
                if (bfsInfo[newX][newY].distance === null) {
                    bfsInfo[newX][newY].distance = bfsInfo[x][y].distance + 1;
                    bfsInfo[newX][newY].predecessor = [x, y];
                    queue.push([newX, newY]);
                }

                if (newX === end[0] && newY === end[1]) {
                    break outer;
                }
            }
        }

        printPath(bfsInfo, end[0], end[1]);
    }

    return {
        knightMoves,
    }
}

const graph = createGraph();
console.log('knightMoves([3, 3], [4, 3]):');
graph.knightMoves([3, 3], [4, 3]);

console.log('knightMoves([0,0],[7,7]):');
graph.knightMoves([0,0],[7,7]);