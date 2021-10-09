/**
 * The following is the function where the solution shall be written
 */

function solution(input) {
  const numArray = [];

  if (input && input.trim() !== '') {
    input.split('').forEach((char) => {
      if (!isNaN(parseInt(char))) {
        numArray.push(char);
      }
    });
  }

  if (numArray.length > 0) {
    const permute = (nums) => {
      const result = [];
      if (nums.length === 1) return nums;

      for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const remainingNums = nums.slice(0, i).concat(nums.slice(i + 1));
        const remainingNumPermute = permute(remainingNums);

        for (let l = 0; l < remainingNumPermute.length; l++) {
          const permutedArray = [currentNum].concat(remainingNumPermute[l]);
          result.push(permutedArray);
        }
      }
      return result;
    };

    const result = permute(numArray).map((a) =>
      Array.isArray(a) ? a.join('') : a
    );
    const uniqeValues = [...new Set(result)];
    const sortedArray = uniqeValues.sort((a, b) => b - a).join(',');
    return sortedArray;
  } else {
    return `Please provide some numbers in your input`;
  }
}

// some example inputs
console.log(solution('326')); // expected ouput 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected ouput 632,623,362,326,263,236
