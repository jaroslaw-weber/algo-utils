import _, { chunk, uniq, uniqBy, flatten, flattenDeep, sortBy, reverse, fill, range, cloneDeep, groupBy, countBy, keyBy, partition, pick, omit, merge, get, set, has, zip, unzip, sum, mean, min, max, random } from "lodash";
import { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache, DefaultMap } from "mnemonist";

export { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache, DefaultMap };

export { chunk, uniq, flattenDeep, sortBy, range, sum, mean, min, max, fill };

export function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function peek<T>(stack: T[]): T | undefined {
  return stack[stack.length - 1];
}

export function inBounds<T>(grid: T[][], r: number, c: number): boolean {
  return r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;
}

export const dirs4: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

export const dirs8: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];

export function getKey(r: number, c: number): string {
  return `${r},${c}`;
}

export function charToIdx(c: string): number {
  return c.charCodeAt(0) - 65;
}

export function idxToChar(i: number): string {
  return String.fromCharCode(i + 65);
}

export class UnionFind {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return;

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
  }

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

export class AdjacencyList<T = number> {
  private map: DefaultMap<T, T[]>;

  constructor() {
    this.map = new DefaultMap<T, T[]>(() => []);
  }

  addEdge(from: T, to: T): void {
    this.map.get(from).push(to);
  }

  addUndirectedEdge(a: T, b: T): void {
    this.addEdge(a, b);
    this.addEdge(b, a);
  }

  getNeighbors(node: T): T[] {
    return this.map.get(node);
  }

  get nodes(): IterableIterator<T> {
    return this.map.keys();
  }
}
