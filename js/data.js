window.PCDL_DATA = {
  cpus: [
    {name:'Intel Core i3-12100F',score:49},{name:'Intel Core i5-12400F',score:60},{name:'Intel Core i5-13400F',score:70},{name:'Intel Core i5-13600K',score:84},{name:'Intel Core i7-14700K',score:94},{name:'Intel Core Ultra 7 265K',score:95},
    {name:'AMD Ryzen 5 3600',score:46},{name:'AMD Ryzen 5 5500',score:50},{name:'AMD Ryzen 5 5600',score:59},{name:'AMD Ryzen 7 5700X',score:66},{name:'AMD Ryzen 7 5700X3D',score:78},{name:'AMD Ryzen 7 5800X',score:70},{name:'AMD Ryzen 7 5800X3D',score:80},{name:'AMD Ryzen 5 7500F',score:77},{name:'AMD Ryzen 5 7600',score:79},{name:'AMD Ryzen 7 7700',score:84},{name:'AMD Ryzen 7 7800X3D',score:96},{name:'AMD Ryzen 7 9800X3D',score:100}
  ],
  gpus: [
    {name:'NVIDIA GeForce GTX 1650 4GB',score:25,vram:4},{name:'NVIDIA GeForce RTX 2060 6GB',score:39,vram:6},{name:'NVIDIA GeForce RTX 3060 12GB',score:50,vram:12},{name:'NVIDIA GeForce RTX 3060 Ti 8GB',score:59,vram:8},{name:'NVIDIA GeForce RTX 4060 8GB',score:57,vram:8},{name:'NVIDIA GeForce RTX 4060 Ti 8GB',score:66,vram:8},{name:'NVIDIA GeForce RTX 4070 Super 12GB',score:79,vram:12},{name:'NVIDIA GeForce RTX 5070 12GB',score:83,vram:12},{name:'NVIDIA GeForce RTX 5070 Ti 16GB',score:91,vram:16},{name:'NVIDIA GeForce RTX 5080 16GB',score:96,vram:16},{name:'NVIDIA GeForce RTX 5090 32GB',score:100,vram:32},
    {name:'AMD Radeon RX 6600 8GB',score:48,vram:8},{name:'AMD Radeon RX 6700 XT 12GB',score:58,vram:12},{name:'AMD Radeon RX 7600 8GB',score:56,vram:8},{name:'AMD Radeon RX 7800 XT 16GB',score:75,vram:16},{name:'AMD Radeon RX 7900 XT 20GB',score:86,vram:20},{name:'AMD Radeon RX 9070 XT 16GB',score:90,vram:16}
  ],
  games: [
    {id:'general',name:'Genel AAA profili',base:115,cpu:0.34,gpu:0.66,vram:8},
    {id:'cs2',name:'Counter-Strike 2',base:280,cpu:0.57,gpu:0.43,vram:6},
    {id:'pubg',name:'PUBG: Battlegrounds',base:155,cpu:0.48,gpu:0.52,vram:8},
    {id:'cyberpunk',name:'Cyberpunk 2077',base:92,cpu:0.28,gpu:0.72,vram:10},
    {id:'rdr2',name:'Red Dead Redemption 2',base:105,cpu:0.31,gpu:0.69,vram:8},
    {id:'battlefield',name:'Battlefield',base:150,cpu:0.44,gpu:0.56,vram:8}
  ],
  builds: {
    office:{entry:['Ryzen 5 5600G / benzeri APU','Dahili grafik','16 GB DDR4','500 GB NVMe','A520/B550 sınıfı','Kaliteli 450–550W PSU'],mid:['Ryzen 5 7600 / benzeri','Dahili grafik veya giriş GPU','16–32 GB DDR5','1 TB NVMe','B650 sınıfı','Kaliteli 550W PSU'],high:['Ryzen 7 7700 / benzeri','İhtiyaca göre orta sınıf GPU','32 GB DDR5','1–2 TB NVMe','B650 Wi‑Fi sınıfı','Kaliteli 650W PSU']},
    gaming:{entry:['Ryzen 5 5600 / i5 sınıfı','RX 6600 / benzeri','16 GB çift kanal','1 TB NVMe','B550/B760 sınıfı','Kaliteli 550–650W PSU'],mid:['Ryzen 5 7500F / 7600','RTX 4060 Ti / RX 7800 XT sınıfı','32 GB DDR5','1 TB Gen4 NVMe','B650 sınıfı','Kaliteli 650–750W PSU'],high:['Ryzen 7 X3D sınıfı','RTX 5070 Ti / 5080 sınıfı','32 GB DDR5 6000','2 TB Gen4 NVMe','B650E/X870 sınıfı','Kaliteli 850W+ Gold PSU']},
    creator:{entry:['Ryzen 5 5600 / i5 sınıfı','RTX 3060 12GB / benzeri','32 GB RAM','1 TB NVMe','B550/B760 sınıfı','Kaliteli 650W PSU'],mid:['Ryzen 7 7700 / i5-i7 sınıfı','RTX 4070 Super sınıfı','32–64 GB DDR5','2 TB NVMe','B650/B760 sınıfı','Kaliteli 750W Gold PSU'],high:['Ryzen 9 / Core Ultra 9 sınıfı','RTX 5080/5090 sınıfı','64 GB+ DDR5','2 TB+ hızlı NVMe','Üst seviye anakart','Kaliteli 1000W+ Gold PSU']}
  }
};
