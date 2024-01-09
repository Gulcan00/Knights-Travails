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

        while (queue.length > 0) {
            const u = queue.shift();
            const [uX, uY] = u;
            for (let x = 0; x < BOARD_SIZE; x++) {
                for (let y = 0; y < BOARD_SIZE; y++) {
                    for (let v of graph[x][y]) {
                        const [newX, newY] = v;
                        if (bfsInfo[newX][newY].distance === null) {
                            bfsInfo[newX][newY].distance = bfsInfo[uX][uY].distance + 1;
                            bfsInfo[newX][newY].predecessor = u;
                            queue.push(bfsInfo[newX][newY]);
                        }
                    }
                }
            }

        }
    }

        return {
            knightMoves,
        }
    }