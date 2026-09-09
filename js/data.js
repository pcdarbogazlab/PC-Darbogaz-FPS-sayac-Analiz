window.PCDL_DATA = {
  cpus: [
    {name:'Intel Core i3-12100F',score:49,gaming:49,multi:34,cores:4,threads:8,socket:'LGA1700',platform:'DDR4 / DDR5'},
    {name:'Intel Core i5-12400F',score:60,gaming:60,multi:48,cores:6,threads:12,socket:'LGA1700',platform:'DDR4 / DDR5'},
    {name:'Intel Core i5-13400F',score:70,gaming:70,multi:65,cores:10,threads:16,socket:'LGA1700',platform:'DDR4 / DDR5'},
    {name:'Intel Core i5-13600K',score:84,gaming:84,multi:82,cores:14,threads:20,socket:'LGA1700',platform:'DDR4 / DDR5'},
    {name:'Intel Core i7-14700K',score:94,gaming:92,multi:97,cores:20,threads:28,socket:'LGA1700',platform:'DDR4 / DDR5'},
    {name:'Intel Core Ultra 7 265K',score:95,gaming:90,multi:96,cores:20,threads:20,socket:'LGA1851',platform:'DDR5'},
    {name:'AMD Ryzen 5 3600',score:46,gaming:46,multi:42,cores:6,threads:12,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 5 5500',score:50,gaming:50,multi:45,cores:6,threads:12,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 5 5600',score:59,gaming:59,multi:52,cores:6,threads:12,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 7 5700X',score:66,gaming:66,multi:65,cores:8,threads:16,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 7 5700X3D',score:78,gaming:86,multi:64,cores:8,threads:16,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 7 5800X',score:70,gaming:70,multi:69,cores:8,threads:16,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 7 5800X3D',score:80,gaming:89,multi:66,cores:8,threads:16,socket:'AM4',platform:'DDR4'},
    {name:'AMD Ryzen 5 7500F',score:77,gaming:77,multi:61,cores:6,threads:12,socket:'AM5',platform:'DDR5'},
    {name:'AMD Ryzen 5 7600',score:79,gaming:79,multi:63,cores:6,threads:12,socket:'AM5',platform:'DDR5'},
    {name:'AMD Ryzen 7 7700',score:84,gaming:84,multi:79,cores:8,threads:16,socket:'AM5',platform:'DDR5'},
    {name:'AMD Ryzen 7 7800X3D',score:96,gaming:97,multi:76,cores:8,threads:16,socket:'AM5',platform:'DDR5'},
    {name:'AMD Ryzen 7 9800X3D',score:100,gaming:100,multi:88,cores:8,threads:16,socket:'AM5',platform:'DDR5'}
  ],
  gpus: [
    {name:'NVIDIA GeForce GTX 1650 4GB',score:25,vram:4},{name:'NVIDIA GeForce RTX 2060 6GB',score:39,vram:6},{name:'NVIDIA GeForce RTX 3060 12GB',score:50,vram:12},{name:'NVIDIA GeForce RTX 3060 Ti 8GB',score:59,vram:8},{name:'NVIDIA GeForce RTX 4060 8GB',score:57,vram:8},{name:'NVIDIA GeForce RTX 4060 Ti 8GB',score:66,vram:8},{name:'NVIDIA GeForce RTX 4070 Super 12GB',score:79,vram:12},{name:'NVIDIA GeForce RTX 5070 12GB',score:83,vram:12},{name:'NVIDIA GeForce RTX 5070 Ti 16GB',score:91,vram:16},{name:'NVIDIA GeForce RTX 5080 16GB',score:96,vram:16},{name:'NVIDIA GeForce RTX 5090 32GB',score:100,vram:32},
    {name:'AMD Radeon RX 6600 8GB',score:48,vram:8},{name:'AMD Radeon RX 6700 XT 12GB',score:58,vram:12},{name:'AMD Radeon RX 7600 8GB',score:56,vram:8},{name:'AMD Radeon RX 7800 XT 16GB',score:75,vram:16},{name:'AMD Radeon RX 7900 XT 20GB',score:86,vram:20},{name:'AMD Radeon RX 9070 XT 16GB',score:90,vram:16}
  ],
  games: [
    // Genel profil
    {id:'general',name:'Genel AAA profili',base:115,cpu:0.34,gpu:0.66,vram:8},

    // E-spor / rekabetçi
    {id:'cs2',name:'Counter-Strike 2',base:280,cpu:0.57,gpu:0.43,vram:6},
    {id:'valorant',name:'Valorant',base:360,cpu:0.64,gpu:0.36,vram:4},
    {id:'lol',name:'League of Legends',base:330,cpu:0.66,gpu:0.34,vram:4},
    {id:'dota2',name:'Dota 2',base:220,cpu:0.60,gpu:0.40,vram:4},
    {id:'r6siege',name:'Rainbow Six Siege',base:300,cpu:0.52,gpu:0.48,vram:6},
    {id:'overwatch2',name:'Overwatch 2',base:245,cpu:0.50,gpu:0.50,vram:6},
    {id:'marvelrivals',name:'Marvel Rivals',base:150,cpu:0.43,gpu:0.57,vram:8},

    // Battle royale / online FPS
    {id:'pubg',name:'PUBG: Battlegrounds',base:155,cpu:0.48,gpu:0.52,vram:8},
    {id:'fortnite',name:'Fortnite',base:175,cpu:0.47,gpu:0.53,vram:8},
    {id:'apex',name:'Apex Legends',base:190,cpu:0.46,gpu:0.54,vram:8},
    {id:'warzone',name:'Call of Duty: Warzone',base:140,cpu:0.45,gpu:0.55,vram:8},
    {id:'battlefield',name:'Battlefield',base:150,cpu:0.44,gpu:0.56,vram:8},
    {id:'tarkov',name:'Escape from Tarkov',base:115,cpu:0.58,gpu:0.42,vram:8},
    {id:'rust',name:'Rust',base:125,cpu:0.55,gpu:0.45,vram:8},

    // Ağır AAA / açık dünya
    {id:'cyberpunk',name:'Cyberpunk 2077',base:92,cpu:0.28,gpu:0.72,vram:10},
    {id:'rdr2',name:'Red Dead Redemption 2',base:105,cpu:0.31,gpu:0.69,vram:8},
    {id:'hogwarts',name:'Hogwarts Legacy',base:100,cpu:0.36,gpu:0.64,vram:10},
    {id:'starfield',name:'Starfield',base:88,cpu:0.40,gpu:0.60,vram:10},
    {id:'blackmyth',name:'Black Myth: Wukong',base:82,cpu:0.27,gpu:0.73,vram:12},
    {id:'alanwake2',name:'Alan Wake 2',base:78,cpu:0.25,gpu:0.75,vram:12},
    {id:'lastofus1',name:'The Last of Us Part I',base:92,cpu:0.35,gpu:0.65,vram:10},
    {id:'acshadows',name:"Assassin's Creed Shadows",base:88,cpu:0.34,gpu:0.66,vram:10},
    {id:'kcd2',name:'Kingdom Come: Deliverance II',base:90,cpu:0.42,gpu:0.58,vram:10},
    {id:'witcher3',name:'The Witcher 3 Next-Gen',base:108,cpu:0.33,gpu:0.67,vram:8},
    {id:'gtav',name:'Grand Theft Auto V',base:175,cpu:0.48,gpu:0.52,vram:6},

    // Yarış / simülasyon
    {id:'forzah5',name:'Forza Horizon 5',base:140,cpu:0.34,gpu:0.66,vram:8},
    {id:'forzams',name:'Forza Motorsport',base:105,cpu:0.35,gpu:0.65,vram:10},
    {id:'assetto',name:'Assetto Corsa Competizione',base:135,cpu:0.47,gpu:0.53,vram:8},

    // Strateji / simülasyon / sandbox
    {id:'cities2',name:'Cities: Skylines II',base:72,cpu:0.57,gpu:0.43,vram:10},
    {id:'msfs',name:'Microsoft Flight Simulator',base:82,cpu:0.59,gpu:0.41,vram:10},
    {id:'minecraft',name:'Minecraft (Java)',base:260,cpu:0.68,gpu:0.32,vram:4}
  ],


  motherboards: [
    {name:'ASUS PRIME B550M-K',socket:'AM4',chipset:'B550',memory:'DDR4',form:'mATX',vrm:58,pcie:'PCIe 4.0',m2:2,wifi:false,oc:true,upgrade:58,tier:'Giriş / Orta'},
    {name:'MSI B550M PRO-VDH WIFI',socket:'AM4',chipset:'B550',memory:'DDR4',form:'mATX',vrm:66,pcie:'PCIe 4.0',m2:2,wifi:true,oc:true,upgrade:62,tier:'Orta'},
    {name:'MSI B550-A PRO',socket:'AM4',chipset:'B550',memory:'DDR4',form:'ATX',vrm:74,pcie:'PCIe 4.0',m2:2,wifi:false,oc:true,upgrade:64,tier:'Orta / F-P'},
    {name:'Gigabyte B650M DS3H',socket:'AM5',chipset:'B650',memory:'DDR5',form:'mATX',vrm:68,pcie:'PCIe 4.0/5.0 depolama',m2:2,wifi:false,oc:true,upgrade:83,tier:'Orta'},
    {name:'MSI PRO B650-S WIFI',socket:'AM5',chipset:'B650',memory:'DDR5',form:'ATX',vrm:74,pcie:'PCIe 4.0/5.0 depolama',m2:2,wifi:true,oc:true,upgrade:86,tier:'Orta / F-P'},
    {name:'MSI MAG B650 TOMAHAWK WIFI',socket:'AM5',chipset:'B650',memory:'DDR5',form:'ATX',vrm:88,pcie:'PCIe 4.0/5.0 depolama',m2:3,wifi:true,oc:true,upgrade:91,tier:'Üst-Orta'},
    {name:'ASUS TUF GAMING B650-PLUS WIFI',socket:'AM5',chipset:'B650',memory:'DDR5',form:'ATX',vrm:86,pcie:'PCIe 4.0/5.0 depolama',m2:3,wifi:true,oc:true,upgrade:90,tier:'Üst-Orta'},
    {name:'MSI PRO B760M-A WIFI DDR4',socket:'LGA1700',chipset:'B760',memory:'DDR4',form:'mATX',vrm:73,pcie:'PCIe 4.0',m2:2,wifi:true,oc:false,upgrade:68,tier:'Orta'},
    {name:'ASUS TUF GAMING B760-PLUS WIFI',socket:'LGA1700',chipset:'B760',memory:'DDR5',form:'ATX',vrm:82,pcie:'PCIe 4.0/5.0',m2:3,wifi:true,oc:false,upgrade:74,tier:'Üst-Orta'},
    {name:'MSI MAG Z790 TOMAHAWK MAX WIFI',socket:'LGA1700',chipset:'Z790',memory:'DDR5',form:'ATX',vrm:93,pcie:'PCIe 5.0',m2:4,wifi:true,oc:true,upgrade:79,tier:'Üst seviye'},
    {name:'MSI PRO Z890-P WIFI',socket:'LGA1851',chipset:'Z890',memory:'DDR5',form:'ATX',vrm:84,pcie:'PCIe 5.0',m2:4,wifi:true,oc:true,upgrade:93,tier:'Yeni nesil / Üst-Orta'}
  ],

  builds: {
    office:{entry:['Ryzen 5 5600G / benzeri APU','Dahili grafik','16 GB DDR4','500 GB NVMe','A520/B550 sınıfı','Kaliteli 450–550W PSU'],mid:['Ryzen 5 7600 / benzeri','Dahili grafik veya giriş GPU','16–32 GB DDR5','1 TB NVMe','B650 sınıfı','Kaliteli 550W PSU'],high:['Ryzen 7 7700 / benzeri','İhtiyaca göre orta sınıf GPU','32 GB DDR5','1–2 TB NVMe','B650 Wi‑Fi sınıfı','Kaliteli 650W PSU']},
    gaming:{entry:['Ryzen 5 5600 / i5 sınıfı','RX 6600 / benzeri','16 GB çift kanal','1 TB NVMe','B550/B760 sınıfı','Kaliteli 550–650W PSU'],mid:['Ryzen 5 7500F / 7600','RTX 4060 Ti / RX 7800 XT sınıfı','32 GB DDR5','1 TB Gen4 NVMe','B650 sınıfı','Kaliteli 650–750W PSU'],high:['Ryzen 7 X3D sınıfı','RTX 5070 Ti / 5080 sınıfı','32 GB DDR5 6000','2 TB Gen4 NVMe','B650E/X870 sınıfı','Kaliteli 850W+ Gold PSU']},
    creator:{entry:['Ryzen 5 5600 / i5 sınıfı','RTX 3060 12GB / benzeri','32 GB RAM','1 TB NVMe','B550/B760 sınıfı','Kaliteli 650W PSU'],mid:['Ryzen 7 7700 / i5-i7 sınıfı','RTX 4070 Super sınıfı','32–64 GB DDR5','2 TB NVMe','B650/B760 sınıfı','Kaliteli 750W Gold PSU'],high:['Ryzen 9 / Core Ultra 9 sınıfı','RTX 5080/5090 sınıfı','64 GB+ DDR5','2 TB+ hızlı NVMe','Üst seviye anakart','Kaliteli 1000W+ Gold PSU']}
  }
};
