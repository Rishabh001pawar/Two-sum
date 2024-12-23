// script.js

document.getElementById('twoSumForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const numsInput = document.getElementById('nums').value;
    const target = parseInt(document.getElementById('target').value, 10);

    // Convert the input string to an array of numbers
    const nums = numsInput.split(',').map(num => parseInt(num.trim(), 10));

    // Validate input
    if (nums.some(isNaN) || isNaN(target)) {
        displayResult('Please enter valid numbers and target.', 'error');
        return;
    }

    // Clear previous results
    resetUI();

    const result = await twoSum(nums, target);

    // Display the result
    if (result.length > 0) {
        displayResult(`Indices: [${result[0]}, ${result[1]}]`, 'success');
    } else {
        displayResult('No solution found.', 'error');
    }
});

async function twoSum(nums, target) {
    const numToIndex = {};
    const traversalSteps = []; // Array to store the steps of traversal

    // Create the diagram
    const diagramDiv = document.getElementById('diagram');
    nums.forEach((num, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.id = `num-${index}`;
        numberDiv.innerText = num;
        diagramDiv.appendChild(numberDiv);
    });

    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        const complement = target - num;

        // Log the current number and its complement
        traversalSteps.push(`Checking number: ${num} (Index: ${index}), Complement: ${complement}`);

        // Highlight the current number
        highlightNumber(index, 'highlight');

        await sleep(800); // Slightly faster visualization

        if (complement in numToIndex) {
            traversalSteps.push(`Found: ${complement} at Index ${numToIndex[complement]}, ${num} at Index ${index}`);
            displayTraversalSteps(traversalSteps);
            highlightNumber(numToIndex[complement], 'found');
            highlightNumber(index, 'found');
            return [numToIndex[complement], index];
        }

        numToIndex[num] = index;

        // Remove highlight after processing
        highlightNumber(index, 'clear');
    }

    displayTraversalSteps(traversalSteps);
    return [];
}

function highlightNumber(index, status) {
    const numberDiv = document.getElementById(`num-${index}`);
    if (status === 'highlight') {
        numberDiv.classList.add('highlight');
    } else if (status === 'found') {
        numberDiv.classList.add('found');
    } else if (status === 'clear') {
        numberDiv.classList.remove('highlight');
    }
}

function displayTraversalSteps(steps) {
    const stepsDiv = document.getElementById('traversalSteps');
    stepsDiv.innerHTML = steps.map(step => `<div>${step}</div>`).join('');
}

function displayResult(message, type) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = type; // Apply appropriate style (e.g., 'success', 'error')
}

function resetUI() {
    // Clear previous diagram and traversal steps
    document.getElementById('diagram').innerHTML = '';
    document.getElementById('traversalSteps').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
