import { Point } from '../../core/interfaces/point';
import { Line } from '../../core/interfaces/line';

export const linesToAdjacencyMatrix = (points: Point[], lines: Line[]) => {
  const matrix: number[][] = [];
  for (let i = 0; i < points.length; i++) {
    matrix.push([]);
    for (let j = 0; j < points.length; j++) {
      matrix[i].push(0);
    }
  }

  let index1;
  let index2;
  for (const line of lines) {
    for (let i = 0; i < points.length; i++) {
      if (line.id1 === points[i].id) {
        index1 = i;
      }
      if (line.id2 === points[i].id) {
        index2 = i;
        matrix[index1][index2] = 1;
        matrix[index2][index1] = 1;
      }
    }
  }
  return matrix;
};

export const dfs = (graph: number[][], root: number) => {
  const visited: boolean[] = [];
  for (let i = 0; i < graph.length; i += 1) {
    visited.push(false);
  }
  const result: number[] = [];
  function worker(st: number) {
    result.push(st);
    visited[st] = true;
    for (let r = 0; r < graph.length; r++) {
      if (!visited[r] && graph[st][r] === 1) {
        worker(r);
      }
    }
  }
  worker(root);
  return result;
};

export const bfs = (graph: number[][], root: number) => {
  const visited: boolean[] = [];
  for (let i = 0; i < graph.length; i++) {
    visited.push(false);
  }
  const result: number[] = [];
  const queue: number[] = [];
  let unit = root;
  let count = 0;
  let head = 0;
  for (let i = 0; i < graph.length; i++) {
    queue.push(0);
  }
  queue[count] = unit;
  count += 1;
  visited[unit] = true;
  while (head < count) {
    unit = queue[head];
    head += 1;
    result.push(unit);
    for (let i = 0; i < graph.length; i++) {
      if (graph[unit][i] && !visited[i]) {
        queue[count] = i;
        count += 1;
        visited[i] = true;
      }
    }
  }
  return result;
};
