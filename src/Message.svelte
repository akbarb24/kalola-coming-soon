<script>
	import {useDestroyEvent} from './useDestroyEvent.js';
	
	console.log('comp');
	
	// the "destroy" event only occurs if this is included
	useDestroyEvent();
</script>

  <span class="text-success">
    <strong>Well done!</strong> You successfully read this
      important alert message.
  </span>