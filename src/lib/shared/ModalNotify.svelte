<script>
  import { createEventDispatcher } from "svelte";

  // help toggle between showing and hiding the notification modal window (i.e: 'show' or 'hide' for possible values)
  export let showNotification = 'hide' 

  // could be 'success' or 'error'
  export let notifyType = '' 

  // message content to be displayed
  export let contentText = ''

  let dispatch = createEventDispatcher()

  function closeModalNotify() {
    dispatch('closeModalNotify', 'hide')
  }

</script>


<article class="modal-notify" class:show-modal-notify={showNotification === 'show'}>
  <section class="notify-content">
    <header class="notify-header">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <i class="lni lni-close close-icon" on:click={closeModalNotify} on:keypress={closeModalNotify} on:keydown={closeModalNotify} ></i>
      {#if notifyType === 'success'}
        <div class="check-icon-container">
          <div class="notify-icon-checkmark">
            <img src="/imgs/checkmark.gif" alt="checkmark_icon" width="100" height="auto">
          </div>
        </div>
        <h3 style="color: var(--accent-success);">success</h3>
      {/if}
      {#if notifyType === 'error'}
        <h3 style="color: crimson;">failed</h3>
      {/if}
    </header>
  
    <div class="notify-text">{@html contentText}</div>

    <!-- closes modal-notification -->
    <footer class="notify-footer">
      <button class="btn-close-notify" on:click={closeModalNotify}>
        close
      </button>
    </footer>
  </section>
</article>


<style>
  .modal-notify {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100dvh;
    background-color: rgb(0 0 0 / 23%);
    display: none;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    overflow: auto;
  }
  .notify-content {
    width: 50%;
    background-color: var(--clr-white);
    border-radius: 6px;
    padding: 1.4em 1.5em;
    animation: notifyLg 0.5s cubic-bezier(0.1, 0.79, 0.43, 1.29);
  }
  .notify-header {
    position: relative;
    text-align: center;
  }
  .notify-header h3 {
    font-size: 1.8em;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: var(--accent-success);
  }
  .check-icon-container {
    display: flex;
    justify-content: center;
  }
  .notify-icon-checkmark {
    width: 180px;
    height: 180px;
    position: relative;
    margin-top: -1em;
    margin-bottom: -3em;
  }
  .notify-icon-checkmark img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .notify-text {
    font-size: 16px;
    margin-bottom: 1em;
    margin-top: 0.5em;
  }
  .close-icon {
    position: absolute;
    right: 0em;
    font-weight: bold;
    font-size: 16px;
    color: #91a5ad;
    cursor: pointer;
    transition: color 0.5s ease;
  }
  .close-icon:hover {
    color: #617076;
  }
  .close-icon:active {
    animation: clickBtn 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .notify-footer {
    padding: 0;
    display: flex;
    justify-content: center;
  }
  .btn-close-notify {
    display: inline-block;
    padding: 15px 18px;
    outline: none;
    appearance: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 1px;
    background-color: var(--clr-site);
    color: #c9d2d7;
    min-width: 350px;
    box-shadow: 0 4px 12px rgb(171 194 112 / 30%);
    transition: box-shadow 0.4s ease, opacity 0.5s ease;
    position: relative;
    isolation: isolate;
  }
  .btn-close-notify:hover {
    opacity: 0.8;
    box-shadow: none;
  }
  .btn-close-notify:active {
    animation: clickBtn 0.6s ease-in-out;
    box-shadow: none;
  }
  /* help show modal notification */
  .show-modal-notify {
    display: flex !important;
  }

  /* Large Desktop Screen */
  @media (min-width: 1692px) {
    .notify-content {
      width: 25%;
    }
  }

  /* normal laptop screen */
  @media (max-width: 1024px) and (min-width: 800px) {
    .notify-content {
      width: 50%;
    }
  }

  /* Tablet screen */
  @media  (max-width: 768px) {
    .notify-content {
      width: 65%;
    }
  }

  /* Mobile screen */
  @media (max-width: 600px) {
    .modal-notify {
      align-items: flex-end;
      height: 100vh;
    }
    .notify-content {
      width: 100%;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding: 1.4em 2em;
      animation: notifySm 0.5s cubic-bezier(0.1, 0.79, 0.43, 1.29);
      margin-bottom: 5.5em;
    }
    .notify-header h3 {
      font-size: 1.8em;
    }
    .notify-footer {
      padding: 0;
      display: block;
    }
    .btn-close-notify {
      min-width: 100%;
      font-variant: all-small-caps;
      font-size: 17px;
    }
  }


  /* Notification animation on smaller devices */
  @keyframes notifySm {
    from {
      transform: translateY(100%);
      opacity: 0.4;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  /* Notification animation on large devices */
  @keyframes notifyLg {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
</style>