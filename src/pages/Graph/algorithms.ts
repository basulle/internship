interface Node {
  [key: string]: number;
}

export const bfs = (graph: number[][], root: number) => {
  const nodesLen: Node = {};
  for (let i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  nodesLen[root] = 0;
  const queue = [root];
  let current;

  while (queue.length !== 0) {
    current = queue.shift();
    const curConnected = graph[current];
    const neighborIdx = [];
    let idx = curConnected.indexOf(1);
    while (idx !== -1) {
      neighborIdx.push(idx);
      idx = curConnected.indexOf(1, idx + 1);
    }
    for (let j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] === Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }
  return nodesLen;
};

export const dfs = (graph: number[][], root: number) => {
  const visited: boolean[] = [];
  for (let i = 0; i < graph.length; i += 1) {
    visited.push(false);
  }
  let r;
  function worker(st: number) {
    console.log(st);
    visited[st] = true;
    for (r = 0; r <= graph.length; r += 1) {
      if (graph[st][r] !== 0 && !visited[r]) {
        worker(r);
      }
    }
  }
  worker(root);
};
