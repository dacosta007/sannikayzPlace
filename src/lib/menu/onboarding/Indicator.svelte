<script>
  export let slideNum = 0
  export let indicate = false
</script>

<!-- indicator for slides -->
<span class="indicator" class:active={indicate} data-indicator="{slideNum}"></span>

<style>
  .indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(234 230 246 / 47%);
    transition: background 500ms ease;
  }

  span:not(:last-of-type) {
    margin-right: 0.5em;
  }

  .active {
    background-color: var(--clr-white);
  }
</style>