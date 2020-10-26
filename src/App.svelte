<script>
	import { SyncLoader } from 'svelte-loading-spinners';
	import TypedJs from '@loscrackitos/svelte-typed-js';

	let promise = Promise.resolve("");

	function handleSubmit(event) {
		let email = event.target.email.value
		promise = doPost(email);
	}

	async function doPost (email) {
		const response = await fetch('https://mailchimp-middleware.akbarb.vercel.app/api/register', {
			method: 'POST',
			headers: {
      	'Accept': 'application/json',
      	'Content-Type': 'application/json'
    	},
			body: JSON.stringify({
				email: email
			})
		})

		setTimeout(() => location.reload(), 2000)
		if (response.ok) {
  		return "Terimakasih! Email sudah kami terima, nanti kamu akan menjadi orang yang pertama kami beritahu.";
		} else {
			throw new Error("Maaf, kami belum menerima email dari kamu. Silahkan kirim lagi.");
		}
	}

	function validateMessageEmail(event) {
			let textbox = event.target;
			if (textbox.value === '') {
					textbox.setCustomValidity('Silahkan masukkan email kamu');
			} else if (textbox.validity.typeMismatch){
					textbox.setCustomValidity('Silahkan masukkan email yang valid');
			} else {
					textbox.setCustomValidity('');
			}
			return true;
	}
</script>

<main>
	<!-- Navigation -->
	<nav class="navbar navbar-light bg-navbar fixed-top">
		<div class="container">
			<a class="display-4 text-blue" href="/">Kalola.</a>
		</div>
	</nav>

	<!-- Full Page Image Header with Vertically Centered Content -->
	<header class="masthead">
		<div class="container h-100">
			<div class="row h-100 align-items-center">
				<div class="col-12 text-left">
					<TypedJs strings="{['<strong>Jasa</strong>?', '<strong>Shoe care</strong>?', '<strong>Barbershop</strong>?', '<strong>Laundry</strong>?']}" loop={true} backDelay={3000}>
						<h5 class="lead">Kamu butuh partner mengelola bisnis <span class="typing"></span></h5>
					</TypedJs>
					<h1 class="font-weight-bold">Kami Segera Hadir Menjadi Partnermu!</h1>
					<p class="lead">Silahkan tinggalkan emailmu, agar kamu jadi orang pertama yang tahu ketika kami siap.</p>
						<form class="form-inline"
								on:submit|preventDefault="{handleSubmit}"
						>
							<div class="form-group mx-sm-3 mb-2">
								<input on:invalid={validateMessageEmail}
									on:changed={validateMessageEmail}
									on:input={validateMessageEmail}
									type="email" class="form-control" id="email" placeholder="Email saya" required>
							</div>
							
							<button type="submit" class="btn btn-primary text-blue font-weight-bold mb-2 mx-sm-3">
								Beri Tahu Saya
							</button>

							{#await promise}
								<SyncLoader size="40" color="#0099ff" unit="px"></SyncLoader>
							{:then message}
								<span class="text-success">
									{message}
								</span>
							{:catch error}
								<span class="text-danger">
									{error}
								</span>
							{/await}
						</form>
				</div>
			</div>
		</div>
	</header>

	<!-- Page Content -->
	<section class="py-5 footer">
		<div class="container">
			<div class="col-lg-8">
				<h2 class="font-weight-light text-light">Apa itu Kalola?</h2>
				<p class="text-light">
					<strong>Kalola</strong> merupakan sebuah aplikasi yang membantu kamu dalam mengelola serta mengembangkan bisnis Jasa milikmu. 
					<strong>Kalola</strong> akan memudahkan kamu dalam mengelola pesanan langganan, manajemen keuangan, manajemen pelanggan, manajemen karyawan dan lain-lainnya.
				</p>
			</div>
		</div>
	</section>
</main>

<style>
	.bg-navbar{
		background-color: #e6e7ee;
	}
	.masthead {
		height: 100vh;
		min-height: 500px;
		background-image: url('/img/wave.svg');
		background-position: bottom;
		background-repeat: no-repeat;
	}

	.footer {
		background-color: #0099ff;
	}

	.text-blue {
		color: #0099ff;
	}
</style>