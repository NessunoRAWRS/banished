<template>
  <div id="faq">
    <h2>Faq</h2>

    <ol>
      <li>
        <h2 id="session-id">Session ID</h2>
        <p>This is an example</p>
        <img src="../assets/img/F12.png">
      </li>
      <li>
        <h2 id="something">Test</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, praesentium? Provident sit, ullam vitae quidem obcaecati repellendus illum, incidunt amet minus reiciendis sed similique adipisci delectus doloribus nulla, ad cumque?</p>
      </li>
      <li>
        <h2 id="test">Test</h2>
        <p>
          <code>This is a code example</code>
        </p>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
	computed: mapState(['appName']),
})
export default class Faq extends Vue {}
</script>


<style lang="scss" scoped>
#faq {
	img {
		overflow: hidden;
		max-width: 100%;
		margin-bottom: 1rem;
	}
	ol {
		li {
			list-style-type: upper-roman;
			margin-left: 1rem;
			margin-bottom: 1.5rem;
			font-style: italic;
		}
	}

	h2 {
		font-style: italic;
		margin-bottom: 0.25rem;
	}

	p {
		font-style: normal;
		margin-bottom: 1rem;
	}
}
</style>