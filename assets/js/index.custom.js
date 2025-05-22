(() => {
	let pollElectionData = [
		{
			id: 1,
			name: "John Doe",
			party: "ABC",
			votes: 1500,
			winner: false,
			position: "2nd",
			color: "#000",
			medal: "./assets/images/svgs/silver-medal-icon.svg",
		},
		{
			id: 2,
			name: "Jane Smith",
			party: "DEF",
			votes: 2000,
			winner: true,
			color: "#85ed27",
			medal: "./assets/gifs/winner.gif",
			position: "1st",
		},
		{
			id: 3,
			name: "Bob Johnson",
			party: "GHI",
			votes: 1200,
			winner: false,
			medal: "./assets/images/svgs/bronze-medal-icon.svg",
			position: "3rd",
			color: "#ddd",
		},
	];

	let sortedArray;

	function getData(data, key) {
		if (!data || !key) return;
		return data.map((item) => item[key]);
	}

	function initChart() {
		const ctx = document.getElementById("myChart");

		new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: getData(pollElectionData, "party"),
				datasets: [
					{
						label: "No of Votes",
						data: getData(pollElectionData, "votes"),
						backgroundColor: getData(pollElectionData, "color"),
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "bottom",
					},
				},
			},
		});
	}

	function triggerSidebar() {
		const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
		const sidebarOpenBtn = document.getElementById("sidebarOpenBtn");
		const sideBar = document.getElementById("sidebarWrapper");
		const shadow = document.getElementById("shadow");

		if (!sidebarCloseBtn || !sidebarOpenBtn || !sideBar) return;
		sidebarOpenBtn.addEventListener("click", function () {
			sideBar.setAttribute("data-is-open", true);
			shadow.setAttribute("data-is-open", true);
		});
		sidebarCloseBtn.addEventListener("click", function () {
			sideBar.setAttribute("data-is-open", false);
			shadow.setAttribute("data-is-open", false);
		});
	}

	function showPollResult() {
		const tableBody = document.getElementById("table-body");
		if (!tableBody) return;
		tableBody.innerHTML = "";
		sortedArray.forEach((eachData, index) => {
			const row = `<li class="v-each-contestant">
													<span><b>${index + 1}</b></span>
													<span>${eachData.name}</span>
													<span>${eachData.party}</span>
													<span>${eachData.votes}</span>
													<span>${eachData.position}</span>
													<button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-contestant-id="${eachData.id}">
														<span class="v-icon">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
																<path
																	fill="currentColor"
																	d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4m0 9.6a2.2 2.2 0 1 0 0 4.402a2.2 2.2 0 0 0 0-4.402" />
															</svg>
														</span>
													</button>
												</li>`;

			tableBody.innerHTML += row;
		});
	}

	function updateTriggerWinner(id) {
		if (!id) return;
		const modalDataParent = document.querySelector(".modal");
		const [contestant] = pollElectionData.filter((currentData) => currentData.id == id);
		modalDataParent.querySelector("[data-name]").innerHTML = contestant.name;
		modalDataParent.querySelector("[data-position]").innerHTML = contestant.position;
		modalDataParent.querySelector("[data-num-of-vote]").innerHTML = contestant.votes.toLocaleString();
		modalDataParent.querySelector("[data-party]").innerHTML = contestant.party;
		modalDataParent.querySelector(".v-modal-image img").src = contestant.medal;
	}

	function triggerContestantData() {
		showPollResult();
		const allTriggeredBtns = document.querySelectorAll("[data-contestant-id]");
		if (!allTriggeredBtns) return;
		allTriggeredBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				const contestantId = this.dataset.contestantId;
				if (contestantId.trim()) {
					updateTriggerWinner(contestantId);
				}
			});
		});
	}

	function initCounters() {
		const counterUp = window?.counterUp.default;
		const allCounters = document.querySelectorAll(".v-card .v-num");
		if (!allCounters.length || !counterUp) return;
		allCounters.forEach((el) => {
			counterUp(el, {
				duration: 5000,
			});
		});
	}

	function initApp() {
		const shadow = document.createElement("div");
		shadow.id = "shadow";
		shadow.setAttribute("data-is-open", false);
		document.body.append(shadow);

		sortedArray = pollElectionData.sort((current, next) => next.votes - current.votes);

		initChart();
		initCounters();
		triggerSidebar();
		triggerContestantData();
	}

	document.addEventListener("DOMContentLoaded", initApp);
})();
