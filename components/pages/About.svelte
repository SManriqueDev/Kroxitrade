<script lang="ts">
  import Button from "../Button.svelte";

  const appVersion = chrome?.runtime?.getManifest?.().version || "dev";
  const githubUrl = "https://github.com/javijec/Kroxitrade";
</script>

<div class="about-page">
  <section class="hero">
    <p class="eyebrow">Kroxitrade</p>
    <h2>Trade tools that stay close to the action.</h2>
    <p class="lead">
      Kroxitrade extends the official Path of Exile trade site with a cleaner workflow for saving searches,
      revisiting them later, pinning interesting results, and reading extra context without leaving the page.
    </p>
  </section>

  <section class="section">
    <h3 class="section-heading">What It Helps With</h3>
    <div class="feature-list">
      <article class="feature-card">
        <h4>Bookmarks</h4>
        <p>Save searches into folders, archive old setups, import/export data, and keep your trading routes organized.</p>
      </article>

      <article class="feature-card">
        <h4>History</h4>
        <p>Jump back into recent trade searches without rebuilding filters from scratch every time.</p>
      </article>

      <article class="feature-card">
        <h4>Pinned Results</h4>
        <p>Keep standout listings visible while you compare prices, mods, or socket setups across the page.</p>
      </article>

      <article class="feature-card">
        <h4>Trade Enhancements</h4>
        <p>Extra helpers like stat highlighting, price equivalents, and page-title updates make scanning faster.</p>
      </article>
    </div>
  </section>

  <section class="section">
    <h3 class="section-heading">Open Source</h3>
    <p class="description">
      Kroxitrade is developed in the open. If you want to report bugs, suggest improvements, or contribute code,
      the GitHub repository is the best place to do it.
    </p>
    <Button href={githubUrl} theme="blue" label="Open GitHub Repository" />
  </section>

  <section class="section">
    <h3 class="section-heading">Built For</h3>
    <p class="description">
      The extension is focused on making Path of Exile trade less repetitive and more readable, while staying close
      to the feel of the original site instead of replacing it entirely.
    </p>
  </section>

  <div class="footer">
    <p class="disclaimer">Kroxitrade is an independent community project and is not affiliated with Grinding Gear Games.</p>
    <p class="version">Version {appVersion}</p>
  </div>
</div>

<style lang="scss">
  @use "../../lib/styles/variables" as *;

  .about-page {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 4px 16px;
    color: $white;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  .hero {
    padding: 14px 14px 16px;
    border: 1px solid rgba($gold, 0.22);
    background:
      linear-gradient(180deg, rgba($gold, 0.08), rgba($gold, 0.02)),
      rgba($white, 0.015);
  }

  .eyebrow {
    margin: 0 0 8px;
    font-family: $primary-font;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba($gold, 0.9);
  }

  h2 {
    margin: 0 0 10px;
    font-family: $primary-font;
    font-size: 22px;
    line-height: 1.08;
    color: $gold;
  }

  .lead,
  .description {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: rgba($white, 0.8);
    overflow-wrap: anywhere;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid rgba($white, 0.08);
    background-color: rgba($white, 0.02);
  }

  .section-heading {
    margin: 0;
    font-family: $primary-font;
    font-size: 16px;
    color: $gold;
  }

  .feature-list {
    display: grid;
    gap: 10px;
  }

  .feature-card {
    padding: 10px;
    border: 1px solid rgba($white, 0.08);
    background-color: rgba($black, 0.35);

    h4 {
      margin: 0 0 6px;
      font-family: $primary-font;
      font-size: 13px;
      color: $white;
    }

    p {
      margin: 0;
      font-size: 12px;
      line-height: 1.5;
      color: rgba($white, 0.72);
      overflow-wrap: anywhere;
    }
  }

  .footer {
    margin-top: 4px;
    padding-top: 14px;
    border-top: 1px solid rgba($white, 0.08);
    text-align: center;
  }

  .disclaimer {
    margin: 0 0 6px;
    font-size: 11px;
    line-height: 1.45;
    color: rgba($white, 0.54);
  }

  .version {
    margin: 0;
    font-size: 12px;
    color: rgba($white, 0.34);
  }
</style>
