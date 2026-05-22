// Sample phrasal verbs database with meaning and examples
const phrasalVerbs = {
  'pass away': {
    meaning: 'to die, to disappear, to cease to be; to be no more, to spend, to waste',
    examples: ['He passed away yesterday', 'The time passed away quickly']
  },
  'break down': {
    meaning: 'to stop working; to fail; to become very upset',
    examples: ['The car broke down on the highway', 'The negotiations broke down']
  },
  'look up': {
    meaning: 'to search for information; to visit someone',
    examples: ['I looked up the word in the dictionary', 'Look me up when you visit']
  },
  'put off': {
    meaning: 'to postpone; to delay; to discourage',
    examples: ['Don\'t put off your homework', 'The smell put me off my food']
  },
  'run out': {
    meaning: 'to use all of something; to have no more',
    examples: ['We ran out of milk', 'Time is running out']
  },
  'give up': {
    meaning: 'to stop trying; to surrender; to quit',
    examples: ['Don\'t give up now', 'He gave up smoking last year']
  },
  'pick up': {
    meaning: 'to lift something; to collect someone; to learn',
    examples: ['Can you pick up the kids from school?', 'I picked up some Spanish while traveling']
  },
  'turn off': {
    meaning: 'to stop the flow or operation; to make someone lose interest',
    examples: ['Please turn off the lights', 'That attitude turns me off']
  }
};

const searchInput = document.querySelector('.search');
const phrasalTitle = document.querySelector('.phrasalTitle');
const phrasalExplain = document.querySelector('.phrasal-explain');
const body = document.querySelector('.body');

// Function to display a phrasal verb with meaning and example
function displayVerb(verbKey) {
  const verb = phrasalVerbs[verbKey];
  if (!verb) return false;
  
  phrasalTitle.textContent = verbKey.toUpperCase() + ':';
  phrasalExplain.textContent = verb.meaning;
  
  // Clear existing examples and add new ones
  let exampleContainer = document.querySelector('.examples-container');
  if (exampleContainer) {
    exampleContainer.remove();
  }
  
  const examplesDiv = document.createElement('div');
  examplesDiv.classList.add('examples-container');
  
  const exampleLabel = document.createElement('p');
  exampleLabel.textContent = 'Examples:';
  exampleLabel.style.fontWeight = 'bold';
  exampleLabel.style.marginTop = '20px';
  examplesDiv.appendChild(exampleLabel);
  
  verb.examples.forEach(example => {
    const exampleText = document.createElement('p');
    exampleText.classList.add('italic');
    exampleText.textContent = '• ' + example;
    examplesDiv.appendChild(exampleText);
  });
  
  // Insert examples after the line element
  const line = body.querySelector('.line');
  line.parentNode.insertBefore(examplesDiv, line.nextSibling);
  
  return true;
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    // Reset to default
    displayVerb('pass away');
    return;
  }
  
  // Find matching verb
  for (let verb in phrasalVerbs) {
    if (verb.includes(searchTerm)) {
      displayVerb(verb);
      return;
    }
  }
  
  // No match found
  phrasalTitle.textContent = 'Not Found';
  phrasalExplain.textContent = 'The phrasal verb "' + searchTerm + '" is not in our database yet.';
  
  let exampleContainer = document.querySelector('.examples-container');
  if (exampleContainer) {
    exampleContainer.remove();
  }
});

// Display default verb on load
displayVerb('pass away');
