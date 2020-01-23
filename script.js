// Load application styles
// import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

console.log('여기서 작업하세요!');

function container () {
  let isActive = true;

  function getSpeedInput() {
    let speed = Math.pow(2, document.getElementById("speedInput").value);
    document.getElementById("showSpeedInput").innerText = 'x' + speed;
    let interval = 250 / speed;
    return interval;
  }

  function bubbleSort(arr) {
    var record = [];
    let sortedIndexArray = [];
    let sortedIndex = arr.length;
    let swapped;
    do {
      swapped = false;
      
      for (var i = 1; i < sortedIndex; i++) {
        let sortingIndex = i - 1;
        let changingIndex = undefined;
        record.push([[...arr], [sortingIndex, sortingIndex + 1], undefined, [...sortedIndexArray]]);

        if (arr[i - 1] > arr[i]) {
          changingIndex = i - 1;
          record.push([[...arr], [sortingIndex, sortingIndex + 1], [changingIndex, changingIndex + 1], [...sortedIndexArray]]);

          const temp = arr[i - 1];
          arr[i - 1] = arr[i];
          arr[i] = temp;
          swapped = true;

          record.push([[...arr], [sortingIndex, sortingIndex + 1], [changingIndex, changingIndex + 1], [...sortedIndexArray]]);
          record.push([[...arr], [sortingIndex, sortingIndex + 1], undefined, [...sortedIndexArray]]);
        }
        if (i === sortedIndex - 1) {
          sortedIndex--;
          sortedIndexArray.push(sortedIndex);

          record.push([[...arr], [sortingIndex], undefined, [...sortedIndexArray]]);
        }
      }
      if (!swapped) {
        for (var i = 0; i < sortedIndex; i++) {
          sortedIndexArray.push(i);
        }
        record.push([[...arr], undefined, undefined, [...sortedIndexArray]]);
        break;
      }
    } while (swapped);
    return record;
  }

  function mergeSort(arr) {
    var record = [];
    function merger(arr1, arr2, start, end) {
      var size = arr1.length + arr2.length;      
      var result = [];
      var sortedIndexArray = [];
      var sortedCounter = -1;
      
      let mergingArea = [];
      for (let i = start; i < end; i++) {
        mergingArea.push(i);
      }

      while (arr1.length && arr2.length) {
        if (arr1[0] <= arr2[0]) {
          var left_index = start + result.length;
          var right_index = start + result.length + arr1.length;
                  
          result.push(arr1[0]);
          arr1.shift();

          arr.splice(start, end - start, ...result.concat(arr1, arr2));

          if (size === arr.length) {
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);

            sortedCounter++;
            sortedIndexArray.push(sortedCounter);
            
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);
          }
          else {
            record.push([[...arr], [left_index, right_index], undefined, undefined, mergingArea]);
          }

        }
        else {
          var left_index = start + result.length;
          var right_index = start + result.length + arr1.length;

          if (size === arr.length) {
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);
            record.push([[...arr], undefined, [left_index, right_index], [...sortedIndexArray], mergingArea]);
          }
          else {
            record.push([[...arr], [left_index, right_index], undefined, undefined, mergingArea]);
            record.push([[...arr], undefined, [left_index, right_index], undefined, mergingArea]);
          }

          result.push(arr2[0]);
          arr2.shift();

          arr.splice(start, end - start, ...result.concat(arr1, arr2));
          var left_index = start + result.length - 1;
          var right_index = start + result.length;
          
          if (size === arr.length) {
            record.push([[...arr], undefined, [left_index, right_index], [...sortedIndexArray], mergingArea]);
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);

            sortedCounter++;
            sortedIndexArray.push(sortedCounter);
            
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);
            record.push([[...arr], [left_index, right_index], undefined, [...sortedIndexArray], mergingArea]);
          }
          else {
            record.push([[...arr], undefined, [left_index, right_index], undefined, mergingArea]);
            record.push([[...arr], [left_index, right_index], undefined, undefined, mergingArea]);
          }
        }
      }
      if (size === arr.length) {
        for (var i = sortedCounter + 1; i < arr.length; i++) {
          sortedIndexArray.push(i);
        }
        record.push([[...arr], undefined, undefined, [...sortedIndexArray], mergingArea]);
      }
      return result.concat(arr1, arr2);
    }

    function model(arr, start, end) {
      var halfLen = Math.floor(arr.length / 2);
      var left = arr.slice(0, halfLen);
      var right = arr.slice(halfLen, arr.length);
      if (left.length > 1) {
        left = model(left, start, start + halfLen);
      }
      if (right.length > 1) {
        right = model(right, start + halfLen, end);
      }
      return merger(left, right, start, end);
    }

    model(arr, 0, arr.length);
    return record;
  }

  function barGenerator(n) {
    for (var i = 0; i < n; i++) {
      const bar = document.createElement("div");
      const barChild = document.createElement("span");
      bar.dataset.id = i;
      bar.className = "bar";
      bar.appendChild(barChild);
      document.getElementById("barsContainer").appendChild(bar);
    }
  }

  function barRemover() {
    const node = document.getElementById("barsContainer")
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function barDrawer(nums, sortingIndices, changingIndices, sortedIndices, shadowIndices) {
    const containerHeight = 500;
    const containerWidth = 800;

    let barWidth = containerWidth / nums.length;
    let marginWidth = barWidth * 0.05;
    if (marginWidth < 1) {
      marginWidth = 1;
    }
    document.body.style.minWidth = barWidth * nums.length * 1.5 + 'px';
    
    const max = Math.max(...nums);

    function eachBarDrawer (i, color) {
      const bar = document.getElementsByClassName("bar")[i];
      const barId = bar.dataset.id;
      const num = nums[barId];
      
      bar.style.width = barWidth + "px";
      bar.style.height = num / max * containerHeight + "px";
      bar.style.backgroundColor = color;
      bar.style.display="inline-block";
      bar.style.verticalAlign = "top";
      bar.style.marginLeft = marginWidth + "px";
      bar.style.marginRight = marginWidth + "px";
    }
    function barTextDrawer (i) {
      const bar = document.getElementsByClassName("bar")[i];
      const barId = bar.dataset.id;
      const num = nums[barId];

      const barChild = bar.children[0];
      barChild.innerText = num;
      barChild.className = "barNum";
      barChild.style.fontSize = 20 * barWidth / 50 + "px";  
    }

    for (var i = 0; i < nums.length; i++) {
      barTextDrawer(i);
      eachBarDrawer(i, 'grey');
    }
    if (shadowIndices) {
      for (const i of shadowIndices) {
        eachBarDrawer(i, 'DarkSlateGray');
      }
    }
    if (sortingIndices) {
      for (const i of sortingIndices) {
        eachBarDrawer(i, 'green');
      }
    }
    if (changingIndices) {
      for (var i of changingIndices) {
        eachBarDrawer(i, 'red');
      }
    }
    if (sortedIndices) {
      for (const i of sortedIndices) {
        eachBarDrawer(i, 'purple');
      }
    }
  }

  function animator(result, count, max, interval) {
    const p = new Promise(function(resolve, reject) {
      barDrawer(result[count][0], result[count][1], result[count][2], result[count][3], result[count][4]);
      count++;
      setTimeout(function() {
        resolve(count);
      }, interval);
    })
    p.then(function(count) {
      let interval = getSpeedInput();

      if (count < max && isActive) {
        animator(result, count, max, interval);
      }
      else {
        jobFinished();
        return;
      }
    })
  }
  function disableButtons(state) {
    document.getElementById("numInput").disabled = state;
    document.getElementById("startButton").disabled = state;
    document.getElementById("bubbleSortButton").disabled = state;
    document.getElementById("mergeSortButton").disabled = state;
    document.getElementById("sizeInput").disabled = state;
  }

  function jobFinished() {

    disableButtons(false);

    document.getElementById("startButton").style.backgroundColor = "transparent";
    document.getElementById("startButton").style.color = "black";

    document.getElementById("startButton").style.opacity = "1";
    document.getElementById("bubbleSortButton").style.opacity = "1";
    document.getElementById("mergeSortButton").style.opacity = "1";
    document.getElementById("sizeInputContainer").style.opacity = "1";
  }

  function inputControl() {
    let algorithm;
    let interval = 500;

    document.getElementById("numInput").addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        const nums = getNumInput();
        if (nums) {
          setTimeout(function() {
            launchControl(nums, interval, algorithm);
            return;
          }, 0)
        }
      }
      else if (event) {
        setTimeout(function() {
          getNumInput();
        }, 0)
      }
    });

    document.getElementById("bubbleSortButton").addEventListener("click", function(event) {
      chooseAlgorithm('bubble');
    })

    document.getElementById("mergeSortButton").addEventListener("click", function(event) {
      chooseAlgorithm('merge');
    })

    document.getElementById("startButton").addEventListener("click", function(event) {
      setTimeout(function(){
        const nums = getNumInput();
        if (nums) {
          launchControl(nums, interval, algorithm);  
        }
      })
    })

    document.getElementById("resetButton").addEventListener("click", function() {
      resetControl();
    })

    document.getElementById("speedInput").addEventListener("input", function(event) {
      getSpeedInput();
    })

    document.getElementById("sizeInput").addEventListener("input", function(event) {
      getSizeInput();
    })

    function chooseAlgorithm(str) {
      function algoButtonClicked (type) {
        const buttons = document.getElementsByClassName('algorithmButtons')
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = "transparent";
          buttons[i].style.color = "black";
          buttons[i].style.border = "1px solid transparent";
        }
        const button = document.getElementById(type + 'SortButton');
        button.style.backgroundColor = "DarkOliveGreen";
        button.style.color = "white";
      }

      if (str === 'bubble') {
        algorithm = 'bubble';
        algoButtonClicked('bubble');
      }
      else if (str === 'merge') {
        algorithm = 'merge';
        algoButtonClicked('merge');
      }
      else if (str === 'resetButtonClicked') {
        algorithm = '';
        const buttons = document.getElementsByClassName('algorithmButtons')
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = "transparent";
          buttons[i].style.color = "black"
          buttons[i].style.border = "1px solid transparent";
        }
      }
      else {
        algorithm = '';
        const buttons = document.getElementsByClassName('algorithmButtons')
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = "transparent";
          buttons[i].style.color = "black"
        }
      }
    }

    function getNumInput() {
      const input = document.getElementById("numInput").value;
      const nums = input.split(",");    
      
      if (nums.length < 5 || 10 < nums.length) {
        document.getElementById('numInput').style.border = "1px solid red";
        return false;
      }
      else {
        document.getElementById('numInput').style.border = "1px solid transparent";
      }

      for (let i = 0; i < nums.length; i++) {
        if (isNaN(nums[i]) || nums[i] === "") {
          return false;
        }
      }

      for (var i = 0; i < nums.length; i++) {
        nums[i] = Number(nums[i]);
      }
      document.getElementById("sizeInput").value = nums.length;

      barRemover();
      barGenerator(nums.length);
      barDrawer(nums, undefined, undefined, undefined, undefined);

      return nums;
    }

    function resetControl() {
      isActive = false;
      chooseAlgorithm('resetButtonClicked');
      initializer(10);
    }
  }

  function randomNumsGenerator(n) {
    const nums = [];
    for (var i = 0; i < n; i++) {
      let hasDuplicate;
      let num;
      do {
        num = Math.floor(Math.random() * n) + 1
        hasDuplicate = nums.includes(num);
      } while (hasDuplicate);
      nums.push(num);
    }
    return nums;
  }

  function initializer(n) {
    if (!n) {
      const n = 10;
    }
    else {
      barRemover();
      const nums = randomNumsGenerator(n);
      document.getElementById("numInput").value = nums;
      document.getElementById("numInput").style.border = "1px solid transparent";
      barGenerator(nums.length);
      barDrawer(nums, undefined, undefined, undefined, undefined);
    }
  }

  function getSizeInput() {
    let size = document.getElementById("sizeInput").value;
    initializer(size);
  }

  function setDefaultState(n) {
    barRemover();

    const nums = randomNumsGenerator(n);
    document.getElementById("numInput").value = nums;
    document.getElementById("sizeInput").value = nums.length;

    barGenerator(nums.length);
    barDrawer(nums, undefined, undefined, undefined);
    getSpeedInput();
  }

  function launchControl(nums, interval, algorithm) {
    let result;
    isActive = true;
    if (algorithm === 'bubble') {
      result = bubbleSort(nums);
    }
    else if (algorithm === 'merge') {
      result = mergeSort(nums);
    }
    else {
      const algorithmButtons = document.getElementsByClassName("algorithmButtons");
      for (let i = 0; i < algorithmButtons.length; i++) {
        algorithmButtons[i].style.border = "1px solid red";
      }
      return;
    }
    disableButtons(true);

    document.getElementById("startButton").style.backgroundColor = "DarkOliveGreen";
    document.getElementById("startButton").style.color = "white";

    document.getElementById("startButton").style.opacity = "0.3";
    document.getElementById("bubbleSortButton").style.opacity = "0.3";
    document.getElementById("mergeSortButton").style.opacity = "0.3";
    document.getElementById("sizeInputContainer").style.opacity = "0.3";
    
    barGenerator(result[0][0].length);
    animator(result, 0, result.length, interval);
  }
  inputControl();
  setDefaultState(10);
}

container();
