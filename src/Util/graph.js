const data = {
  labels: [],
  datasets: [
    {
      label: null,
      data: [],
      fill: false,
      backgroundColor: 'rgb(255, 199, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: null,
      data: [],
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

export function constructDataset(labels, { key, value }) {
  const ok = {};
  data.map((d) => {
    const hmm = {
      label: key,
      data: value,
      fill: true,
      backgroundColor: '',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    };
    return;
  });
}
