const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const output = document.querySelector('#output');

btn.addEventListener('click', (e) => {
  let numWithHtml = '';
  e.preventDefault();
  const inputValue = input.value;
  const nums = solution(inputValue);

  if (Array.isArray(nums)) {
    nums.forEach((num, i) => {
      numWithHtml += `
      <span 
        class="main_output-number" style="animation-delay: ${0.1 * i + 0.1}s">
        ${num}${i === nums.length - 1 ? '' : ','}
      </span>`;
    });

    output.innerHTML = numWithHtml;
  } else {
    output.innerHTML = `
      <p class="main_output-error">
        ${nums}.
      </p>`;
  }
});

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
    const sortedArray = uniqeValues.sort((a, b) => b - a);
    return sortedArray;
  } else {
    return `Please provide some numbers in your input`;
  }
}
