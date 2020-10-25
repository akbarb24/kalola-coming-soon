import {onDestroy, createEventDispatcher} from 'svelte';

export const useDestroyEvent = () => {
	const dispatch = createEventDispatcher();
	onDestroy(() =>	dispatch('destroy'))
}