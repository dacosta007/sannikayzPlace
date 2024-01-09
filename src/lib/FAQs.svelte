<script>
  export let allFAQ = []

  // help toggle the answer to be displayed when user click a question
  let activeIndx = 0

  function toggleFAQ(evt) {
    const question = parseInt(evt.target.dataset.qIndx)
    activeIndx = question
  }
</script>

<section class="faq-container">
  {#each allFAQ as faq, indx}
    <div class="faq" class:active={activeIndx === indx}>
      <div class="question" data-q-indx="{indx}" on:click={toggleFAQ} on:keypress={toggleFAQ}>
        <div data-q-indx="{indx}" on:click={toggleFAQ} on:keypress={toggleFAQ}>{faq.question}</div>
        <i class="lni lni-close toggle-icon" data-q-indx="{indx}" on:keypress={toggleFAQ}></i>
      </div>
      <div class="answer">{@html faq.answer}</div>
    </div>
  {/each}
</section>

<style>
  .faq-container {
    margin: 2em 0em;
    padding: 0 3em;
  }
  .faq {
    background-color: var(--clr-white);
    color: var(--clr-text);
    border-radius: 10px;
    border: 1px solid var(--clr-sec);
    transition: border-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .faq:not(:last-of-type) {
    margin-bottom: 1em;
  }
  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    background-color: #f9fae982;
    padding: 1em;
    transition: background-color 500ms cubic-bezier(0, 0, 0.27, 0.99);
    cursor: pointer;
  }
  .question:hover {
    background-color: var(--clr-off-white);
  }
  .question div {
    font-size: 16px;
    font-weight: bold;
  }
  .question div::first-letter {
    text-transform: capitalize;
  }
  .question i {
    font-size: 16px;
    font-weight: bold;
    padding: 0.3em;
    border-radius: 50%;
    transform: rotate(45deg);
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .answer {
    padding: 1em;
    font-size: 16px;
    display: none;
    transition: 500ms ease;
  }
  .active .question {
    background-color: var(--clr-off-white);
  }
  .active .question i {
    transform: rotate(0deg);
  }
  .active .answer {
    display: inherit;
  }
  @media (max-width: 500px) {
    .faq-container {
      padding: 0 0;
    }
    .question {
      font-size: 16px;
      font-weight: bold;
    }
    .question i {
      font-size: 16px;
    }
    .answer {
      font-size: 14px;
    }
  }
</style>