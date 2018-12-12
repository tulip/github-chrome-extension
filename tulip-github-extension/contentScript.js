const LOG_ENABLED = false;
function log(...args) {
  if (!LOG_ENABLED) {
    return;
  }

  console.log('[Tulip Github Extension]', ...args);
}

function warn(...args) {
  console.warn('[Tulip Github Extension]', ...args);
}

function isSquashAndMergeButton(el) {
  const BUTTON_SELECTOR = 'button';
  const BUTTON_TEXT = 'Squash and merge';

  if (!el.matches(BUTTON_SELECTOR)) {
    return false;
  }

  return el.innerText.toLowerCase().trim() === BUTTON_TEXT.toLowerCase().trim();
}

function getPRTitle() {
  const TITLE_SELECTOR = '.js-issue-title';

  const titleEl = document.querySelector(TITLE_SELECTOR);

  if (!titleEl) {
    return '(Could not detect title)';
  }

  return titleEl.innerText.trim();
}

function getPRFirstCommentBodyMarkdown() {
  const TEXTAREA_SELECTOR = '.js-discussion .js-comment-container textarea[name="pull_request[body]"]';

  // querySelector traverses the dom using depth-first preorder traversal, so
  // this will get the textarea for the first comment
  const textarea = document.querySelector(TEXTAREA_SELECTOR);

  if (!textarea) {
    return '(Could not detect body)';
  }

  return textarea.value;
}

function updateCommitTitleAndMessage(title, message) {
  const COMMIT_TITLE_INPUT_SELECTOR = 'input[name=commit_title]';
  const COMMIT_MESSAGE_INPUT_SELECTOR = 'textarea[name=commit_message]';

  const titleEl = document.querySelector(COMMIT_TITLE_INPUT_SELECTOR);
  if (!titleEl) {
    warn('Could not find the title input');
  }

  const messageEl = document.querySelector(COMMIT_MESSAGE_INPUT_SELECTOR);
  if (!messageEl) {
    warn('Could not find the message input');
  }

  log('Setting title to', title);
  titleEl.value = title;

  log('Setting message to', message);
  messageEl.value = message;
}

function bindToSquashMergeButton() {
  // Github is kinda an SPA -- it doesn't re-load the page when doing some
  // navigation (like going to PRs). So instead of finding the merge button
  // and binding to it, we use the Delegated Events pattern -- we bind to
  // all click events, and them determine if the event we get is for the
  // merge button.
  document.body.addEventListener('click', (evt) => {
    log('Got a click event on', evt.target);
    if (isSquashAndMergeButton(evt.target)) {
      log('Squash and merge button was clicked');
      updateCommitTitleAndMessage(getPRTitle(), getPRFirstCommentBodyMarkdown());
    }
  });
}


log('Content script is running');
bindToSquashMergeButton();
