let packets = [];
let monitoring = false;
let timer;

const samplePackets = [
    {
        source: "192.168.1.10",
        destination: "192.168.1.20",
        protocol: "TCP",
        size: 1200
    },
    {
        source: "192.168.1.15",
        destination: "192.168.1.25",
        protocol: "UDP",
        size: 800
    },
    {
        source: "192.168.1.30",
        destination: "192.168.1.40",
        protocol: "ICMP",
        size: 64
    },
    {
        source: "192.168.1.12",
        destination: "192.168.1.50",
        protocol: "TCP",
        size: 1500
    },
    {
        source: "192.168.1.18",
        destination: "192.168.1.60",
        protocol: "UDP",
        size: 500
    }
];

function startMonitoring() {

    if (monitoring) return;

    monitoring = true;

    document.getElementById("status").textContent =
        "Monitoring simulation started";

    timer = setInterval(() => {

        const packet = samplePackets[
            Math.floor(Math.random() * samplePackets.length)
        ];

        packets.push(packet);

        displayPackets();

    }, 1500);
}

function stopMonitoring() {

    monitoring = false;

    clearInterval(timer);

    document.getElementById("status").textContent =
        "Monitoring stopped";
}

function displayPackets() {

    const filter = document.getElementById("filter").value;

    const filteredPackets = packets.filter(packet => {
        return filter === "ALL" || packet.protocol === filter;
    });

    const table = document.getElementById("packetData");

    table.innerHTML = "";

    filteredPackets.forEach(packet => {

        const row = document.createElement("tr");

        [
            packet.source,
            packet.destination,
            packet.protocol,
            packet.size + " Bytes"
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    document.getElementById("total").textContent =
        packets.length;

    document.getElementById("tcp").textContent =
        packets.filter(p => p.protocol === "TCP").length;

    document.getElementById("udp").textContent =
        packets.filter(p => p.protocol === "UDP").length;
}

document.getElementById("filter").addEventListener(
    "change",
    displayPackets
);