export interface Problem {
    number: string
    title: string
    difficulty: 'easy' | 'medium' | 'hard'
  }
  
  export interface ProblemStats {
    solveCount: number
    notes: string
    lastSolved: string | null
  }
  
  export interface Filters {
    category: string
    status: string
    difficulty: string
  }
  
  export const leetcodeData: Record<string, Problem[]> = {
    "Array / String": [
      { number: "1768", title: "Merge Strings Alternately", difficulty: "easy" },
      { number: "1071", title: "Greatest Common Divisor of Strings", difficulty: "easy" },
      { number: "1431", title: "Kids With the Greatest Number of Candies", difficulty: "easy" },
      { number: "605", title: "Can Place Flowers", difficulty: "easy" },
      { number: "345", title: "Reverse Vowels of a String", difficulty: "easy" },
      { number: "151", title: "Reverse Words in a String", difficulty: "medium" },
      { number: "238", title: "Product of Array Except Self", difficulty: "medium" },
      { number: "334", title: "Increasing Triplet Subsequence", difficulty: "medium" },
      { number: "443", title: "String Compression", difficulty: "medium" }
    ],
    "Two Pointers": [
      { number: "283", title: "Move Zeroes", difficulty: "easy" },
      { number: "392", title: "Is Subsequence", difficulty: "easy" },
      { number: "11", title: "Container With Most Water", difficulty: "medium" },
      { number: "1679", title: "Max Number of K-Sum Pairs", difficulty: "medium" }
    ],
    "Sliding Window": [
      { number: "643", title: "Maximum Average Subarray I", difficulty: "easy" },
      { number: "1456", title: "Maximum Number of Vowels in a Substring of Given Length", difficulty: "medium" },
      { number: "1004", title: "Max Consecutive Ones III", difficulty: "medium" },
      { number: "1493", title: "Longest Subarray of 1's After Deleting One Element", difficulty: "medium" }
    ],
    "Prefix Sum": [
      { number: "1732", title: "Find the Highest Altitude", difficulty: "easy" },
      { number: "724", title: "Find Pivot Index", difficulty: "easy" }
    ],
    "Hash Map / Set": [
      { number: "2215", title: "Find the Difference of Two Arrays", difficulty: "easy" },
      { number: "1207", title: "Unique Number of Occurrences", difficulty: "easy" },
      { number: "1657", title: "Determine if Two Strings Are Close", difficulty: "medium" },
      { number: "2352", title: "Equal Row and Column Pairs", difficulty: "medium" }
    ],
    "Stack": [
      { number: "2390", title: "Removing Stars From a String", difficulty: "medium" },
      { number: "735", title: "Asteroid Collision", difficulty: "medium" },
      { number: "394", title: "Decode String", difficulty: "medium" }
    ],
    "Queue": [
      { number: "933", title: "Number of Recent Calls", difficulty: "easy" },
      { number: "649", title: "Dota2 Senate", difficulty: "medium" }
    ],
    "Linked List": [
      { number: "2095", title: "Delete the Middle Node of a Linked List", difficulty: "medium" },
      { number: "328", title: "Odd Even Linked List", difficulty: "medium" },
      { number: "206", title: "Reverse Linked List", difficulty: "easy" },
      { number: "2130", title: "Maximum Twin Sum of a Linked List", difficulty: "medium" }
    ],
    "Binary Tree - DFS": [
      { number: "104", title: "Maximum Depth of Binary Tree", difficulty: "easy" },
      { number: "872", title: "Leaf-Similar Trees", difficulty: "easy" },
      { number: "1448", title: "Count Good Nodes in Binary Tree", difficulty: "medium" },
      { number: "437", title: "Path Sum III", difficulty: "medium" },
      { number: "1372", title: "Longest ZigZag Path in a Binary Tree", difficulty: "medium" },
      { number: "236", title: "Lowest Common Ancestor of a Binary Tree", difficulty: "medium" }
    ],
    "Binary Tree - BFS": [
      { number: "199", title: "Binary Tree Right Side View", difficulty: "medium" },
      { number: "1161", title: "Maximum Level Sum of a Binary Tree", difficulty: "medium" }
    ],
    "Binary Search Tree": [
      { number: "700", title: "Search in a Binary Search Tree", difficulty: "easy" },
      { number: "450", title: "Delete Node in a BST", difficulty: "medium" }
    ],
    "Graphs - DFS": [
      { number: "841", title: "Keys and Rooms", difficulty: "medium" },
      { number: "547", title: "Number of Provinces", difficulty: "medium" },
      { number: "1466", title: "Reorder Routes to Make All Paths Lead to the City Zero", difficulty: "medium" },
      { number: "399", title: "Evaluate Division", difficulty: "medium" }
    ],
    "Graphs - BFS": [
      { number: "1926", title: "Nearest Exit from Entrance in Maze", difficulty: "medium" },
      { number: "994", title: "Rotting Oranges", difficulty: "medium" }
    ],
    "Heap / Priority Queue": [
      { number: "215", title: "Kth Largest Element in an Array", difficulty: "medium" },
      { number: "2336", title: "Smallest Number in Infinite Set", difficulty: "medium" },
      { number: "2542", title: "Maximum Subsequence Score", difficulty: "medium" },
      { number: "2462", title: "Total Cost to Hire K Workers", difficulty: "medium" }
    ],
    "Binary Search": [
      { number: "374", title: "Guess Number Higher or Lower", difficulty: "easy" },
      { number: "2300", title: "Successful Pairs of Spells and Potions", difficulty: "medium" },
      { number: "162", title: "Find Peak Element", difficulty: "medium" },
      { number: "875", title: "Koko Eating Bananas", difficulty: "medium" }
    ],
    "Backtracking": [
      { number: "17", title: "Letter Combinations of a Phone Number", difficulty: "medium" },
      { number: "216", title: "Combination Sum III", difficulty: "medium" }
    ],
    "DP - 1D": [
      { number: "1137", title: "N-th Tribonacci Number", difficulty: "easy" },
      { number: "746", title: "Min Cost Climbing Stairs", difficulty: "easy" },
      { number: "198", title: "House Robber", difficulty: "medium" },
      { number: "790", title: "Domino and Tromino Tiling", difficulty: "medium" }
    ],
    "DP - Multidimensional": [
      { number: "62", title: "Unique Paths", difficulty: "medium" },
      { number: "1143", title: "Longest Common Subsequence", difficulty: "medium" },
      { number: "714", title: "Best Time to Buy and Sell Stock with Transaction Fee", difficulty: "medium" },
      { number: "72", title: "Edit Distance", difficulty: "medium" }
    ],
    "Bit Manipulation": [
      { number: "338", title: "Counting Bits", difficulty: "easy" },
      { number: "136", title: "Single Number", difficulty: "easy" },
      { number: "1318", title: "Minimum Flips to Make a OR b Equal to c", difficulty: "medium" }
    ],
    "Trie": [
      { number: "208", title: "Implement Trie (Prefix Tree)", difficulty: "medium" },
      { number: "1268", title: "Search Suggestions System", difficulty: "medium" }
    ],
    "Intervals": [
      { number: "435", title: "Non-overlapping Intervals", difficulty: "medium" },
      { number: "452", title: "Minimum Number of Arrows to Burst Balloons", difficulty: "medium" }
    ],
    "Monotonic Stack": [
      { number: "739", title: "Daily Temperatures", difficulty: "medium" },
      { number: "901", title: "Online Stock Span", difficulty: "medium" }
    ]
  }