export declare class TreeNode<T = number> {
  val: T
  left: TreeNode | null
  right: TreeNode | null
  constructor(val: T, left?: TreeNode, right?: TreeNode)
  static from<T = number>(array: (T | null)[]): TreeNode<T>
}
