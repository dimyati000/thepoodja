export const VILLAS_DATA = [
  {
    id: "havana-canggu",
    name: "Havana",
    location: "Jalan Pantai Batu Bolong, Canggu",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    address: "Jalan Pantai Batu Bolong, Canggu, Bali 80361",
    coords: { lat: -8.6478, lng: 115.1385 },
    rooms: [
      {
        id: "type-a",
        name: "Havana Type A",
        price: 2500000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "190",
        tags: [
          { id: "Kolam Pribadi", en: "Private Pool" },
          { id: "Pemandangan Sawah", en: "Ricefield View" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "2 King Beds, 2 Twin Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "2 Twin Beds",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "A tropical oasis located in the heart of Canggu, Havana Type A offers three spacious bedrooms, an expansive living area with a private pool, and a beautiful ricefield view.",
          id: "Oasis tropis di jantung Canggu, Havana Type A menawarkan tiga kamar tidur luas, ruang tamu yang lapang dengan kolam renang pribadi, dan pemandangan sawah yang indah.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Havana Type A sits quietly at the edge of an emerald ricefield, just minutes from Canggu's beaches and cafés. The three-bedroom layout was designed for families and groups who want space without sacrificing intimacy, with the private pool taking center stage in a sun-drenched courtyard framed by tropical palms.\n\nEvery detail, from the timber louvers to the open-air corridors, is built to draw the outside in — you'll hear the rice paddies rustle and the birds call from your morning coffee spot.",
            },
            {
              title: "Living Spaces",
              body: "The open-plan living and dining area flows directly onto the pool deck through wide sliding doors, keeping the tropical breeze moving through the villa all day. A fully equipped kitchen sits just off the dining table, ideal for group breakfasts or a private chef experience.\n\nIn the evening, the living room's low daybeds and soft lighting turn the space into a relaxed spot for cards, conversation, or simply watching the sky change color over the ricefields.",
            },
            {
              title: "Bedrooms",
              body: "The master bedroom features a king-sized bed facing full-height glass doors that open onto a private garden view, complete with an en-suite bathroom and walk-in wardrobe. The second bedroom is fitted with two twin beds, perfect for children or friends travelling together, while the third bedroom offers a second king bed and its own en-suite — ideal for an additional couple or family member.\n\nAll three rooms are fully air-conditioned and finished with handwoven textiles sourced from local artisans.",
            },
            {
              title: "Pool & Outdoors",
              body: "The private pool stretches along the villa's northern edge, bordered by sun loungers and a shaded gazebo for the hottest hours of the day. At dusk, string lighting turns the courtyard into a warm, intimate space perfect for a quiet dinner under the stars.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Havana Type A berdiri tenang di tepi sawah hijau zamrud, hanya beberapa menit dari pantai dan kafe-kafe Canggu. Tata letak tiga kamar ini dirancang untuk keluarga atau grup yang menginginkan ruang tanpa kehilangan keintiman, dengan kolam renang pribadi sebagai pusat perhatian di halaman yang diterangi matahari dan dikelilingi pohon palem tropis.\n\nSetiap detail, dari kisi-kisi kayu hingga koridor terbuka, dirancang untuk menghadirkan suasana luar ke dalam — Anda akan mendengar gemerisik sawah dan kicauan burung dari tempat ngopi pagi Anda.",
            },
            {
              title: "Ruang Tamu",
              body: "Ruang tamu dan makan yang terbuka mengalir langsung ke dek kolam melalui pintu geser lebar, menjaga angin tropis tetap mengalir sepanjang hari. Dapur lengkap terletak tepat di samping meja makan, ideal untuk sarapan bersama atau pengalaman private chef.\n\nDi malam hari, daybed rendah dan pencahayaan lembut di ruang tamu mengubah suasana menjadi tempat santai untuk bermain kartu, mengobrol, atau sekadar menyaksikan langit berubah warna di atas sawah.",
            },
            {
              title: "Kamar Tidur",
              body: "Kamar utama memiliki tempat tidur king yang menghadap pintu kaca setinggi langit-langit yang terbuka ke pemandangan taman pribadi, dilengkapi kamar mandi dalam dan lemari walk-in. Kamar kedua dilengkapi dua tempat tidur twin, cocok untuk anak-anak atau teman yang bepergian bersama, sementara kamar ketiga memiliki tempat tidur king kedua dengan kamar mandi dalam sendiri — cocok untuk pasangan atau anggota keluarga tambahan.\n\nKetiga kamar dilengkapi AC penuh dan dihiasi tekstil tenun tangan dari pengrajin lokal.",
            },
            {
              title: "Kolam & Area Luar",
              body: "Kolam renang pribadi membentang di sisi utara villa, dikelilingi kursi berjemur dan gazebo teduh untuk jam-jam terpanas. Saat senja, lampu string mengubah halaman menjadi ruang hangat dan intim, sempurna untuk makan malam tenang di bawah bintang.",
            },
          ],
        },
        facilities: [
          { label: { id: "Kolam Pribadi", en: "Private Pool" }, icon: "pool" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          {
            label: { id: "Pembersihan Harian", en: "Daily Cleaning" },
            icon: "cleaning",
          },
        ],
      },
      {
        id: "type-b",
        name: "Havana Type B",
        price: 2750000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "195",
        tags: [
          { id: "Jacuzzi", en: "Jacuzzi" },
          { id: "Desain Modern", en: "Modern Design" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "Modern minimalist design meets tropical living. Havana Type B includes three bedrooms, a private jacuzzi, and a spacious open-plan living room perfect for entertaining.",
          id: "Desain minimalis modern berpadu dengan gaya hidup tropis. Havana Type B dilengkapi tiga kamar tidur, jacuzzi pribadi, dan ruang tamu terbuka yang luas, cocok untuk menjamu tamu.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Havana Type B is a study in modern minimalism — clean concrete lines, black steel framing, and warm timber accents come together around a private jacuzzi terrace. It's built for guests who want a sleek, design-forward base in Canggu without losing the relaxed tropical feel.\n\nThe villa's two-storey silhouette maximizes airflow and natural light, with every one of its three bedrooms oriented to catch the afternoon breeze.",
            },
            {
              title: "Living Spaces",
              body: "The open-plan living room spans nearly the full width of the ground floor, anchored by a sculptural sectional sofa and a media wall with a large-format smart TV. Floor-to-ceiling glass doors fold completely open, merging the living room with the jacuzzi terrace for effortless indoor-outdoor entertaining.\n\nA discreet wet bar sits near the entrance, stocked and ready for evening cocktails before heading out to Canggu's nightlife.",
            },
            {
              title: "Bedrooms",
              body: "All three bedrooms feature king-sized beds dressed in Egyptian cotton linens, with the primary suite offering a freestanding soaking tub beside its floor-to-ceiling windows. The second and third bedrooms each come with their own en-suite bathroom and built-in wardrobes, with a private workspace nook tucked beside one of them for longer-staying guests.\n\nBlackout curtains and individually zoned air conditioning ensure a cool, quiet sleep regardless of Bali's daytime heat.",
            },
            {
              title: "Jacuzzi & Terrace",
              body: "The private jacuzzi is set into a raised timber deck, screened from the street by a living wall of tropical foliage. It's the villa's signature feature — ideal for a late-night soak after a day exploring Canggu's beach clubs and surf breaks.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Havana Type B adalah perwujudan minimalisme modern — garis beton yang bersih, rangka baja hitam, dan aksen kayu hangat menyatu di sekitar teras jacuzzi pribadi. Villa ini dibangun untuk tamu yang menginginkan basis bergaya di Canggu tanpa kehilangan nuansa tropis yang santai.\n\nSiluet dua lantai villa ini memaksimalkan sirkulasi udara dan cahaya alami, dengan ketiga kamar tidurnya diarahkan untuk menangkap angin sore.",
            },
            {
              title: "Ruang Tamu",
              body: "Ruang tamu terbuka membentang hampir seluruh lebar lantai dasar, dengan sofa sectional bergaya sebagai pusatnya dan dinding media berisi Smart TV berukuran besar. Pintu kaca dari lantai ke langit-langit dapat dibuka penuh, menyatukan ruang tamu dengan teras jacuzzi untuk suasana indoor-outdoor yang mulus.\n\nWet bar tersembunyi berada dekat pintu masuk, siap untuk koktail malam sebelum berangkat menikmati kehidupan malam Canggu.",
            },
            {
              title: "Kamar Tidur",
              body: "Ketiga kamar tidur memiliki tempat tidur king dengan seprai katun Mesir, dan kamar utama dilengkapi bathtub berdiri bebas di samping jendela dari lantai ke langit-langit. Kamar kedua dan ketiga masing-masing memiliki kamar mandi dalam sendiri dan lemari built-in, dengan sudut kerja pribadi di salah satu kamar untuk tamu yang menginap lebih lama.\n\nTirai blackout dan AC dengan zona terpisah memastikan tidur yang sejuk dan tenang meski cuaca Bali panas di siang hari.",
            },
            {
              title: "Jacuzzi & Teras",
              body: "Jacuzzi pribadi terletak di dek kayu yang ditinggikan, terlindung dari jalan oleh dinding tanaman tropis hidup. Ini adalah fitur andalan villa — sempurna untuk berendam di malam hari setelah seharian menjelajahi beach club dan spot selancar Canggu.",
            },
          ],
        },
        facilities: [
          {
            label: { id: "Jacuzzi Pribadi", en: "Private Jacuzzi" },
            icon: "jacuzzi",
          },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          {
            label: { id: "Parkir Pribadi", en: "Private Parking" },
            icon: "parking",
          },
        ],
      },
      {
        id: "type-c",
        name: "Havana Type C",
        price: 6500000,
        guests: 10,
        beds: 5,
        baths: 5,
        size: "500",
        tags: [
          { id: "Estate Keluarga Besar", en: "Grand Family Estate" },
          { id: "Taman Luas", en: "Extensive Garden" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1622015663319-e97e697503ee?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "5 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 4",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 5",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "A 500m² grand family estate, Havana Type C provides five spacious bedrooms across multiple pavilions, an expansive tropical garden, and an oversized swimming pool.",
          id: "Estate keluarga megah seluas 500m², Havana Type C menyediakan lima kamar tidur luas di beberapa paviliun, taman tropis yang sangat luas, dan kolam renang berukuran ekstra.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Havana Type C is the largest property in the Havana collection — a 500m² compound built with families and multi-generational groups in mind. Five bedrooms are spread across separate pavilions connected by covered walkways, all wrapped around an expansive tropical garden that gives the whole estate a private, resort-like feel.\n\nWide verandas connect every room to the outdoors, so the sound of the garden — birds, rustling palms, distant waves — is always close by.",
            },
            {
              title: "Living Spaces",
              body: "The living and dining pavilion is open on three sides, letting the garden breeze move freely through the space. A long communal dining table seats the whole group comfortably, while the adjoining kitchen is fully equipped for guests who want to cook together or bring in a private chef for a special evening.\n\nA separate, air-conditioned family lounge and media room with a large TV offers a cooler retreat during the midday heat, alongside a dedicated games corner for the kids.",
            },
            {
              title: "Bedrooms",
              body: "Each of the five bedrooms is fitted with a king-sized bed and its own en-suite bathroom, giving every guest privacy without sacrificing closeness. Three garden-facing rooms open onto private sitting nooks, a fourth overlooks the pool deck directly, and the fifth sits in its own quieter pavilion — ideal for grandparents or guests who prefer to turn in earlier.\n\nAll rooms include generous wardrobe space, ideal for longer family holidays with plenty of luggage.",
            },
            {
              title: "Pool & Garden",
              body: "The oversized pool is the heart of Havana Type C, flanked by a wide sundeck and a dedicated BBQ pavilion for family cookouts. The surrounding tropical garden — planted with frangipani, heliconia, and mature palms — spans the full width of the estate, with shaded corners for reading, napping, or letting the kids run free, plus a separate staff villa for a private chef or nanny on longer stays.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Havana Type C adalah properti terbesar di koleksi Havana — kompleks seluas 500m² yang dibangun dengan mempertimbangkan keluarga dan grup lintas generasi. Lima kamar tidur tersebar di beberapa paviliun terpisah yang dihubungkan lorong beratap, semuanya mengelilingi taman tropis luas yang memberi seluruh estate nuansa privat seperti resor.\n\nBeranda lebar menghubungkan setiap ruangan dengan area luar, sehingga suara taman — burung, gemerisik pohon palem, deburan ombak dari kejauhan — selalu terasa dekat.",
            },
            {
              title: "Ruang Tamu",
              body: "Paviliun ruang tamu dan makan terbuka di tiga sisi, membiarkan angin taman bergerak bebas melalui ruangan. Meja makan komunal yang panjang menampung seluruh grup dengan nyaman, sementara dapur di sebelahnya lengkap bagi tamu yang ingin memasak bersama atau memanggil private chef untuk malam istimewa.\n\nRuang keluarga terpisah yang ber-AC dan ruang media dengan TV besar menawarkan tempat berlindung yang lebih sejuk saat panas siang hari, ditambah sudut permainan khusus untuk anak-anak.",
            },
            {
              title: "Kamar Tidur",
              body: "Setiap dari lima kamar tidur dilengkapi tempat tidur king dan kamar mandi dalam masing-masing, memberi privasi tanpa mengorbankan kedekatan. Tiga kamar menghadap taman membuka ke sudut duduk pribadi, kamar keempat langsung menghadap dek kolam, dan kamar kelima berada di paviliun tersendiri yang lebih tenang — cocok untuk kakek-nenek atau tamu yang ingin istirahat lebih awal.\n\nSemua kamar memiliki ruang lemari yang luas, ideal untuk liburan keluarga lebih lama dengan banyak bawaan.",
            },
            {
              title: "Kolam & Taman",
              body: "Kolam berukuran ekstra besar adalah jantung Havana Type C, diapit dek berjemur luas dan paviliun BBQ khusus untuk acara bakar-bakar keluarga. Taman tropis di sekelilingnya — ditanami kamboja, heliconia, dan pohon palem dewasa — membentang di seluruh lebar estate, dengan sudut teduh untuk membaca, bersantai, atau membiarkan anak-anak bermain bebas, ditambah villa staf terpisah untuk private chef atau pengasuh saat menginap lebih lama.",
            },
          ],
        },
        facilities: [
          {
            label: { id: "Kolam Ekstra Besar", en: "Extra Large Pool" },
            icon: "pool",
          },
          {
            label: { id: "Taman Tropis Luas", en: "Extensive Tropical Garden" },
            icon: "garden",
          },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Ruang Media", en: "Media Room" }, icon: "tv" },
          { label: { id: "Paviliun BBQ", en: "BBQ Pavilion" }, icon: "bbq" },
          {
            label: { id: "Villa Staf / Pengasuh", en: "Staff / Nanny Villa" },
            icon: "staff",
          },
          { label: { id: "Koki di Villa", en: "In-Villa Chef" }, icon: "chef" },
        ],
      },
      {
        id: "type-d",
        name: "Havana Type D",
        price: 1800000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "185",
        tags: [
          { id: "Cocok untuk Grup Kecil", en: "Great for Small Groups" },
          { id: "Nyaman", en: "Cozy" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "A cozy three-bedroom villa tucked behind a private garden wall, perfect for small families or groups of friends. Havana Type D offers a secluded plunge pool and a relaxed, intimate garden setting.",
          id: "Villa tiga kamar yang nyaman di balik dinding taman pribadi, cocok untuk keluarga kecil atau grup teman. Havana Type D menawarkan plunge pool tersembunyi dan suasana taman yang santai dan intim.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Havana Type D is tucked behind a private garden wall that ensures total seclusion from the moment you step through the gate. With three bedrooms wrapped around a shared plunge pool, it suits small families or groups of friends who want a quiet, self-contained base without needing a large estate.\n\nDespite its compact footprint, the villa never feels small; a clever open layout keeps every corner connected to the pool and sky above.",
            },
            {
              title: "Living Spaces",
              body: "A single, sun-filled living pavilion combines the lounge, mini kitchen, and dining nook into one flowing space that opens directly onto the pool deck. It's an intentionally simple layout — nothing to manage, nothing to plan, just space to relax together.\n\nA small but well-stocked mini bar keeps evening drinks close at hand without needing to leave the villa.",
            },
            {
              title: "Bedrooms",
              body: "The master bedroom is built around a plush king-sized bed facing the plunge pool through a wall of glass, so the first thing you see each morning is water and greenery. The second and third bedrooms each offer their own king bed and en-suite bathroom, giving every guest privacy while staying just steps from the shared pool and living area.\n\nSoft linens, warm lighting, and a curated playlist speaker complete the villa's relaxed, intimate mood throughout.",
            },
            {
              title: "Plunge Pool",
              body: "The secluded plunge pool is the villa's centerpiece, framed by dense tropical planting that keeps prying eyes out entirely. It's the perfect spot for a floating breakfast, a sunset glass of wine, or simply doing nothing at all.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Havana Type D tersembunyi di balik dinding taman pribadi yang memastikan privasi penuh sejak Anda melangkah masuk gerbang. Dengan tiga kamar tidur yang mengelilingi plunge pool bersama, villa ini cocok untuk keluarga kecil atau grup teman yang menginginkan basis tenang dan mandiri tanpa perlu estate besar.\n\nMeski berukuran ringkas, villa ini tidak pernah terasa sempit; tata letak terbuka yang cerdas membuat setiap sudut tetap terhubung dengan kolam dan langit di atasnya.",
            },
            {
              title: "Ruang Tamu",
              body: "Satu paviliun ruang tamu yang terang oleh matahari menggabungkan lounge, dapur mini, dan sudut makan menjadi satu ruang yang mengalir langsung ke dek kolam. Tata letaknya sengaja dibuat sederhana — tidak ada yang perlu diatur, hanya ruang untuk bersantai bersama.\n\nMini bar kecil namun lengkap membuat minuman malam selalu dekat tanpa perlu keluar villa.",
            },
            {
              title: "Kamar Tidur",
              body: "Kamar utama dibangun mengelilingi tempat tidur king yang mewah, menghadap plunge pool melalui dinding kaca, sehingga hal pertama yang Anda lihat setiap pagi adalah air dan hijaunya dedaunan. Kamar kedua dan ketiga masing-masing memiliki tempat tidur king dan kamar mandi dalam sendiri, memberi privasi bagi setiap tamu namun tetap dekat dengan kolam dan ruang tamu bersama.\n\nSeprai lembut, pencahayaan hangat, dan speaker musik pilihan melengkapi suasana santai dan intim di seluruh villa.",
            },
            {
              title: "Plunge Pool",
              body: "Plunge pool tersembunyi adalah pusat perhatian villa ini, dikelilingi tanaman tropis lebat yang menjaga privasi sepenuhnya dari pandangan luar. Tempat sempurna untuk sarapan mengapung, segelas anggur saat matahari terbenam, atau sekadar tidak melakukan apa-apa.",
            },
          ],
        },
        facilities: [
          { label: { id: "Plunge Pool", en: "Plunge Pool" }, icon: "pool" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          { label: { id: "Mini Bar", en: "Mini Bar" }, icon: "minibar" },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          {
            label: { id: "Pembersihan Harian", en: "Daily Cleaning" },
            icon: "cleaning",
          },
        ],
      },
    ],
  },
  {
    id: "le-marva-ubud",
    name: "Le Marva",
    location: "Ubud",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    address: "Jalan Sayan, Ubud, Bali 80571",
    coords: { lat: -8.5188, lng: 115.2425 },
    rooms: [
      {
        id: "villa-1",
        name: "Le Marva Ubud Villa 1",
        price: 4200000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "195",
        tags: [
          { id: "Pemandangan Hutan", en: "Jungle View" },
          { id: "Infinity Pool", en: "Infinity Pool" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1717167398817-121e3c283dbb?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "Cantilevered over the lush river valley, this three-bedroom villa features an infinity pool that blends seamlessly with the jungle canopy. Ideal for nature-loving families or groups seeking luxury.",
          id: "Menjorok di atas lembah sungai yang rimbun, villa tiga kamar ini memiliki infinity pool yang menyatu sempurna dengan kanopi hutan. Ideal untuk keluarga atau grup pecinta alam yang menginginkan kemewahan.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Le Marva Ubud Villa 1 is cantilevered directly over the Sayan river valley, suspended above a canopy of ferns, coconut palms, and centuries-old trees. It's a villa built for guests chasing Ubud's signature jungle serenity without giving up five-star comfort.\n\nEvery room is oriented toward the valley view, so the sound of the river and the calls of tropical birds become the soundtrack to your stay.",
            },
            {
              title: "Living Spaces",
              body: "The living pavilion is elevated on stilts, with glass balustrades that keep the jungle view unobstructed from every seat. A gourmet open kitchen sits alongside a long dining table, ideal for a private chef experience overlooking the valley at sunset.\n\nA yoga deck extends off the living area, complete with mats and a bolster set for morning practice as the mist lifts off the canopy below.",
            },
            {
              title: "Bedrooms",
              body: "All three king bedrooms are positioned at the villa's edge, with floor-to-ceiling glass walls that turn the jungle into a living mural. The primary suite includes an in-villa spa corner with a daybed for in-room massages, while the second and third bedrooms each open onto their own private balcony.\n\nNatural stone bathrooms with rainfall showers complete each room, finished in materials sourced from around Bali.",
            },
            {
              title: "Infinity Pool",
              body: "The infinity pool appears to spill directly into the jungle canopy below, with an edge that disappears against the valley backdrop. It's the villa's most photographed spot — and rightly so, especially at golden hour when the light filters through the trees.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Le Marva Ubud Villa 1 menjorok langsung di atas lembah sungai Sayan, tergantung di atas kanopi pakis, pohon kelapa, dan pepohonan berusia ratusan tahun. Villa ini dibangun untuk tamu yang mencari ketenangan khas hutan Ubud tanpa mengorbankan kenyamanan bintang lima.\n\nSetiap ruangan diarahkan menghadap lembah, sehingga suara sungai dan kicauan burung tropis menjadi soundtrack selama menginap.",
            },
            {
              title: "Ruang Tamu",
              body: "Paviliun ruang tamu ditinggikan di atas tiang, dengan pagar kaca yang menjaga pemandangan hutan tetap tak terhalang dari setiap sudut duduk. Dapur terbuka gourmet berada di samping meja makan panjang, ideal untuk pengalaman private chef sambil menatap lembah saat matahari terbenam.\n\nDek yoga memanjang dari ruang tamu, lengkap dengan matras dan bolster untuk latihan pagi saat kabut mulai naik dari kanopi di bawah.",
            },
            {
              title: "Kamar Tidur",
              body: "Ketiga kamar king berada di tepi villa, dengan dinding kaca dari lantai ke langit-langit yang mengubah hutan menjadi lukisan hidup. Kamar utama memiliki sudut spa dalam villa dengan daybed untuk pijat di kamar, sementara kamar kedua dan ketiga masing-masing membuka ke balkon pribadinya sendiri.\n\nKamar mandi batu alam dengan rain shower melengkapi setiap kamar, menggunakan material yang diambil dari berbagai penjuru Bali.",
            },
            {
              title: "Infinity Pool",
              body: "Infinity pool tampak seolah tumpah langsung ke kanopi hutan di bawahnya, dengan tepian yang menghilang membaur dengan latar lembah. Ini adalah spot paling banyak difoto di villa — dan memang pantas, terutama saat golden hour ketika cahaya menyaring di antara pepohonan.",
            },
          ],
        },
        facilities: [
          { label: { id: "Infinity Pool", en: "Infinity Pool" }, icon: "pool" },
          { label: { id: "Dek Hutan", en: "Jungle Deck" }, icon: "deck" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Gourmet", en: "Gourmet Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Matras Yoga", en: "Yoga Mats" }, icon: "yoga" },
          { label: { id: "Spa di Villa", en: "In-Villa Spa" }, icon: "spa" },
        ],
      },
      {
        id: "villa-2",
        name: "Le Marva Ubud Villa 2",
        price: 3800000,
        guests: 4,
        beds: 2,
        baths: 2,
        size: "140",
        tags: [
          { id: "Romantis", en: "Romantic" },
          { id: "Tersembunyi", en: "Secluded" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "2 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "A secluded two-bedroom retreat nestled deep within the Ubud rainforest, ideal for couples travelling together. Enjoy breakfast floating in your private pool to the sound of exotic birds.",
          id: "Tempat peristirahatan dua kamar yang tersembunyi jauh di dalam hutan hujan Ubud, ideal untuk pasangan yang bepergian bersama. Nikmati sarapan mengapung di kolam pribadi Anda diiringi suara burung-burung eksotis.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Le Marva Ubud Villa 2 is hidden deep within the rainforest surrounding Sayan, accessible only via a private stone path that winds through ferns and bamboo groves. It's built entirely around seclusion — you won't see or hear another guest during your stay.\n\nThe two-bedroom layout keeps the experience intimate and unhurried, designed specifically for couples travelling together on a honeymoon, anniversary escape, or shared getaway with close friends.",
            },
            {
              title: "Living Spaces",
              body: "A compact but beautifully finished living pavilion opens fully onto the pool terrace, with rattan furnishings and soft linen upholstery that echo the surrounding forest tones. There's no formal dining room — instead, meals are served wherever you'd like, from the pool edge to the bedroom balcony.\n\nA small reading nook tucked beside the window overlooks the ravine, stocked with books on Balinese culture and design.",
            },
            {
              title: "Bedrooms",
              body: "The master bedroom is wrapped in glass on two sides, framing uninterrupted rainforest views from the moment you wake. A four-poster bed draped in mosquito netting adds a romantic, old-world feel, while the en-suite bathroom features an open-air stone bathtub positioned to catch the morning light.\n\nThe second bedroom shares the same forest-facing outlook and its own en-suite bathroom, making the villa equally suited to two couples travelling together or a couple bringing family along.",
            },
            {
              title: "Floating Breakfast",
              body: "The villa's signature experience is breakfast served floating on a tray in the private pool, timed to the sound of birdsong as the forest wakes up around you. It's a quiet, unhurried ritual that guests consistently describe as the highlight of their stay.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Le Marva Ubud Villa 2 tersembunyi jauh di dalam hutan hujan yang mengelilingi Sayan, hanya dapat diakses melalui jalan setapak batu pribadi yang berkelok di antara pakis dan rumpun bambu. Villa ini dibangun sepenuhnya untuk privasi — Anda tidak akan melihat atau mendengar tamu lain selama menginap.\n\nTata letak dua kamar menjaga pengalaman tetap intim dan santai, dirancang khusus untuk pasangan yang bepergian bersama saat bulan madu, merayakan hari jadi, atau liburan bersama teman dekat.",
            },
            {
              title: "Ruang Tamu",
              body: "Paviliun ruang tamu yang ringkas namun dirancang dengan indah terbuka penuh ke teras kolam, dengan furnitur rotan dan pelapis linen lembut yang menggemakan warna hutan sekitarnya. Tidak ada ruang makan formal — sebagai gantinya, makanan disajikan di mana pun Anda suka, dari tepi kolam hingga balkon kamar.\n\nSudut membaca kecil di dekat jendela menghadap jurang, dilengkapi buku-buku tentang budaya dan desain Bali.",
            },
            {
              title: "Kamar Tidur",
              body: "Kamar utama dibungkus kaca di dua sisi, membingkai pemandangan hutan hujan tanpa jeda sejak Anda bangun tidur. Tempat tidur berkanopi dengan kelambu menambah kesan romantis dan klasik, sementara kamar mandi dalamnya memiliki bathtub batu terbuka yang diposisikan menangkap cahaya pagi.\n\nKamar kedua berbagi pemandangan hutan yang sama dan memiliki kamar mandi dalam sendiri, membuat villa ini cocok untuk dua pasangan yang bepergian bersama atau satu pasangan yang membawa keluarga.",
            },
            {
              title: "Sarapan Mengapung",
              body: "Pengalaman khas villa ini adalah sarapan yang disajikan mengapung di atas nampan di kolam pribadi, diiringi kicauan burung saat hutan mulai terbangun di sekitar Anda. Ritual yang tenang dan santai ini selalu disebut tamu sebagai momen paling berkesan selama menginap.",
            },
          ],
        },
        facilities: [
          { label: { id: "Kolam Pribadi", en: "Private Pool" }, icon: "pool" },
          {
            label: { id: "Sarapan Mengapung", en: "Floating Breakfast" },
            icon: "breakfast",
          },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          {
            label: { id: "Bathtub Outdoor", en: "Outdoor Bath" },
            icon: "bath",
          },
        ],
      },
    ],
  },
  {
    id: "le-marva-canggu",
    name: "Le Marva",
    location: "Canggu",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    address: "Jalan Nelayan, Canggu, Bali 80361",
    coords: { lat: -8.6534, lng: 115.1312 },
    rooms: [
      {
        id: "b1-akara",
        name: "B1 - Akara Villa",
        price: 3500000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "190",
        tags: [
          { id: "Kemewahan Modern", en: "Modern Luxury" },
          { id: "Dekat Pantai", en: "Near Beach" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "Akara Villa at Le Marva Canggu epitomizes modern coastal luxury. With three chic bedrooms, a stunning private pool, and within walking distance to the beach.",
          id: "Akara Villa di Le Marva Canggu mencerminkan kemewahan pesisir modern. Dengan tiga kamar tidur elegan, kolam renang pribadi yang memukau, dan jaraknya dekat berjalan kaki ke pantai.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Akara Villa sits within a five-minute walk of Canggu's black-sand shoreline, wrapped in a chic, coastal-modern shell of white render and dark timber. It's designed for guests who want beach-town convenience with resort-level polish.\n\nThe three-bedroom layout suits families or small groups travelling together, with every space oriented toward the pool courtyard at the villa's core.",
            },
            {
              title: "Living Spaces",
              body: "The ground floor is almost entirely open, with retractable glass walls connecting the living room, dining area, and pool deck into a single continuous space. Interiors lean into a coastal palette — whites, sandy neutrals, and brass fixtures — that feels equally at home dressed up for dinner or barefoot after the beach.\n\nA fully equipped kitchen with an island bench makes it easy to prep a post-surf smoothie or host a full dinner party.",
            },
            {
              title: "Bedrooms",
              body: "All three king bedrooms occupy the upper floor, each with its own en-suite bathroom and a private balcony catching the afternoon sea breeze. Interiors are kept deliberately calm — linen bedding, woven pendant lights, and minimal decor — so the focus stays on rest after a day at the beach clubs.",
            },
            {
              title: "Pool & Location",
              body: "The private pool anchors the ground-floor courtyard, framed by day beds and a small outdoor shower. With Berawa and Batu Bolong beaches, Finns Beach Club, and Canggu's café strip all within easy reach, Akara Villa balances quiet privacy with genuine walkability.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Akara Villa berjarak lima menit berjalan kaki dari garis pantai berpasir hitam Canggu, dibungkus fasad modern pesisir berupa dinding putih dan kayu gelap. Dirancang untuk tamu yang menginginkan kenyamanan kawasan pantai dengan sentuhan setara resor.\n\nTata letak tiga kamar cocok untuk keluarga atau grup kecil yang bepergian bersama, dengan setiap ruang diarahkan menghadap halaman kolam di jantung villa.",
            },
            {
              title: "Ruang Tamu",
              body: "Lantai dasar hampir sepenuhnya terbuka, dengan dinding kaca yang dapat ditarik menghubungkan ruang tamu, area makan, dan dek kolam menjadi satu ruang menyatu. Interior mengambil palet pesisir — putih, netral berpasir, dan aksen kuningan — yang terasa pas baik untuk makan malam formal maupun santai bertelanjang kaki setelah dari pantai.\n\nDapur lengkap dengan island counter memudahkan membuat smoothie setelah berselancar atau menjamu makan malam.",
            },
            {
              title: "Kamar Tidur",
              body: "Ketiga kamar king berada di lantai atas, masing-masing dengan kamar mandi dalam dan balkon pribadi yang menangkap angin laut sore. Interior sengaja dijaga tenang — seprai linen, lampu gantung anyaman, dan dekorasi minimal — agar fokus tetap pada istirahat setelah seharian di beach club.",
            },
            {
              title: "Kolam & Lokasi",
              body: "Kolam pribadi menjadi pusat halaman lantai dasar, dikelilingi daybed dan shower outdoor kecil. Dengan Pantai Berawa dan Batu Bolong, Finns Beach Club, serta deretan kafe Canggu yang mudah dijangkau, Akara Villa menyeimbangkan privasi tenang dengan lokasi yang benar-benar walkable.",
            },
          ],
        },
        facilities: [
          { label: { id: "Kolam Pribadi", en: "Private Pool" }, icon: "pool" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          { label: { id: "Mesin Kopi", en: "Coffee Machine" }, icon: "coffee" },
        ],
      },
      {
        id: "b7-alana",
        name: "B7 - Alana Villa",
        price: 3500000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "190",
        tags: [
          { id: "Luas", en: "Spacious" },
          { id: "Minimalis", en: "Minimalist" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556630279-0ecfac70eaf2?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "Alana Villa offers minimalist aesthetics with maximum comfort across three bedrooms. Large floor-to-ceiling windows bathe the open-plan living area in natural sunlight.",
          id: "Alana Villa menawarkan estetika minimalis dengan kenyamanan maksimal di tiga kamar tidur. Jendela besar dari lantai ke langit-langit membanjiri ruang tamu terbuka dengan cahaya matahari alami.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Alana Villa is an exercise in restraint — clean geometry, an uncluttered material palette, and generous proportions that let light and space do the talking. It sits a short stroll from Le Marva's shared amenities while retaining full independence and privacy.\n\nThe villa was designed for guests who value calm, uncluttered surroundings as much as comfort, with each of its three rooms stripped back to its essentials.",
            },
            {
              title: "Living Spaces",
              body: "Floor-to-ceiling glazing wraps the entire ground floor, flooding the open-plan living and dining area with natural light throughout the day. A dedicated workspace corner near the window makes Alana Villa a favorite for guests balancing remote work with their Bali stay.\n\nThe kitchen follows the same minimalist language — integrated appliances, hidden storage, and a single long counter that doubles as a breakfast bar.",
            },
            {
              title: "Bedrooms",
              body: "All three king bedrooms continue the villa's restrained material palette, with oak flooring, linen drapery, and built-in storage that keeps surfaces clear. Each room's en-suite bathroom features a walk-in rain shower finished in matte concrete tile.\n\nLarge sliding windows in every room can be opened fully to let the courtyard breeze move through at night.",
            },
            {
              title: "Workspace & Outdoors",
              body: "A shaded outdoor lounge sits just off the living room, furnished with a low daybed and a small private garden — an easy spot to close the laptop and unwind at the end of the day.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Alana Villa adalah latihan kesederhanaan — geometri bersih, palet material yang tidak berlebihan, dan proporsi luas yang membiarkan cahaya dan ruang berbicara sendiri. Villa ini berjarak jalan kaki singkat dari fasilitas bersama Le Marva namun tetap mandiri dan privat sepenuhnya.\n\nVilla ini dirancang untuk tamu yang menghargai lingkungan tenang dan rapi sama seperti kenyamanan, dengan masing-masing dari tiga kamarnya disederhanakan hingga ke esensinya.",
            },
            {
              title: "Ruang Tamu",
              body: "Kaca dari lantai ke langit-langit membungkus seluruh lantai dasar, membanjiri ruang tamu dan makan terbuka dengan cahaya alami sepanjang hari. Sudut kerja khusus dekat jendela membuat Alana Villa menjadi favorit tamu yang menyeimbangkan kerja jarak jauh dengan liburan di Bali.\n\nDapur mengikuti bahasa desain minimalis yang sama — peralatan terintegrasi, penyimpanan tersembunyi, dan satu counter panjang yang juga berfungsi sebagai breakfast bar.",
            },
            {
              title: "Kamar Tidur",
              body: "Ketiga kamar king melanjutkan palet material villa yang sederhana, dengan lantai kayu oak, gorden linen, dan penyimpanan built-in yang menjaga permukaan tetap rapi. Kamar mandi dalam setiap kamar memiliki walk-in rain shower berlapis ubin beton matte.\n\nJendela geser besar di setiap kamar dapat dibuka penuh untuk membiarkan angin halaman mengalir di malam hari.",
            },
            {
              title: "Ruang Kerja & Area Luar",
              body: "Lounge outdoor teduh berada tepat di samping ruang tamu, dilengkapi daybed rendah dan taman pribadi kecil — tempat mudah untuk menutup laptop dan bersantai di penghujung hari.",
            },
          ],
        },
        facilities: [
          { label: { id: "Kolam Pribadi", en: "Private Pool" }, icon: "pool" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
          { label: { id: "Ruang Kerja", en: "Workspace" }, icon: "workspace" },
        ],
      },
      {
        id: "b9-amara",
        name: "B9 - Amara Villa",
        price: 3600000,
        guests: 6,
        beds: 3,
        baths: 3,
        size: "195",
        tags: [
          { id: "Teras Rooftop", en: "Rooftop Terrace" },
          { id: "Pemandangan Sunset", en: "Sunset View" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1651108066220-f61c22fc281f?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "3 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "Amara Villa takes luxury to the next level with three bedrooms and a private rooftop terrace, offering spectacular sunset views over Canggu. Perfect for evening cocktails.",
          id: "Amara Villa membawa kemewahan ke level berikutnya dengan tiga kamar tidur dan teras rooftop pribadi, menawarkan pemandangan matahari terbenam yang spektakuler di atas Canggu. Sempurna untuk koktail sore hari.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Amara Villa's defining feature is its private rooftop — a vantage point that few other properties in Canggu can match, with uninterrupted views stretching toward the horizon. The villa was built vertically specifically to capture this sunset panorama.\n\nBelow the rooftop, three floors of thoughtfully laid-out living space cater equally well to small families and groups seeking a design-led stay.",
            },
            {
              title: "Living Spaces",
              body: "The ground-floor living and dining area opens onto a compact private pool, with an open kitchen positioned for effortless entertaining. A spiral staircase connects the living space directly to the rooftop terrace above, keeping the flow of the villa vertical and social.\n\nA premium sound system runs throughout the ground floor and rooftop, ideal for hosting a sunset gathering with friends.",
            },
            {
              title: "Bedrooms",
              body: "All three king bedrooms are spread across the first and second floors, positioned to catch cross-breezes between the pool courtyard and the street-facing garden. Each room includes an en-suite bathroom finished in warm terracotta tile, along with a reading nook by the window.",
            },
            {
              title: "Rooftop Terrace",
              body: "The rooftop is furnished with low-slung daybeds, an outdoor bar cart, and shade sails that can be drawn back for stargazing after dark. As the sun drops toward the Indian Ocean, this becomes the villa's undisputed best seat in the house.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Fitur andalan Amara Villa adalah rooftop pribadinya — sudut pandang yang sulit ditandingi properti lain di Canggu, dengan pemandangan tak terhalang membentang hingga ke horizon. Villa ini dibangun secara vertikal khusus untuk menangkap panorama matahari terbenam ini.\n\nDi bawah rooftop, tiga lantai ruang tamu yang tertata rapi cocok baik untuk keluarga kecil maupun grup yang mencari pengalaman menginap bergaya.",
            },
            {
              title: "Ruang Tamu",
              body: "Ruang tamu dan makan di lantai dasar membuka ke kolam pribadi berukuran ringkas, dengan dapur terbuka yang diposisikan untuk kemudahan menjamu tamu. Tangga spiral menghubungkan ruang tamu langsung ke teras rooftop di atas, menjaga alur villa tetap vertikal dan sosial.\n\nSistem audio premium terpasang di lantai dasar dan rooftop, ideal untuk mengadakan kumpul sore bersama teman.",
            },
            {
              title: "Kamar Tidur",
              body: "Ketiga kamar king tersebar di lantai satu dan dua, diposisikan untuk menangkap angin silang antara halaman kolam dan taman yang menghadap jalan. Setiap kamar dilengkapi kamar mandi dalam berlapis ubin terracotta hangat, serta sudut membaca di dekat jendela.",
            },
            {
              title: "Teras Rooftop",
              body: "Rooftop dilengkapi daybed rendah, kereta bar outdoor, dan kanopi peneduh yang dapat ditarik untuk menikmati bintang di malam hari. Saat matahari turun ke arah Samudra Hindia, area ini menjadi kursi terbaik yang tak tertandingi di villa.",
            },
          ],
        },
        facilities: [
          { label: { id: "Kolam Pribadi", en: "Private Pool" }, icon: "pool" },
          {
            label: { id: "Teras Rooftop", en: "Rooftop Terrace" },
            icon: "deck",
          },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Lengkap", en: "Fully Equipped Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
          {
            label: { id: "Pendingin Ruangan", en: "Air Conditioning" },
            icon: "ac",
          },
        ],
      },
      {
        id: "b11-anaya",
        name: "B11 - Anaya Villa",
        price: 7800000,
        guests: 10,
        beds: 5,
        baths: 5,
        size: "500",
        tags: [
          { id: "Premium", en: "Premium" },
          { id: "Estate 500m²", en: "500m² Estate" },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
        ],
        bedConfig: "5 King Beds",
        sleepConfig: [
          {
            name: "Master Bedroom",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 2",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 3",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 4",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
          },
          {
            name: "Bedroom 5",
            bedConfig: "1 King Bed",
            bathConfig: "1 Indoor Bathroom",
            image:
              "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1400&q=80",
          },
        ],
        description: {
          en: "The crown jewel of Le Marva Canggu, Anaya Villa is a 500m² premium estate with five bedrooms, an extra-large swimming pool, and exquisite custom furnishings.",
          id: "Permata utama Le Marva Canggu, Anaya Villa adalah estate premium seluas 500m² dengan lima kamar tidur, kolam renang ekstra besar, dan perabotan kustom yang eksklusif.",
        },
        descriptionSections: {
          en: [
            {
              title: "The Villa",
              body: "Anaya Villa is the flagship property of Le Marva Canggu — a 500m² five-bedroom estate built with no compromises, from its extra-large pool to its fully custom furnishings crafted specifically for the villa. It's the natural choice for guests who want the very best the estate has to offer.\n\nEvery material and finish was selected for longevity and quiet luxury, from the hand-finished teak flooring to the hardware sourced from Balinese silversmiths.",
            },
            {
              title: "Living Spaces",
              body: "The living and dining pavilion spans double height, anchored by a custom chandelier and a dining table crafted from a single reclaimed timber slab. The gourmet kitchen is fully equipped for an in-villa chef, complete with a butler's pantry for discreet catering during larger gatherings.\n\nPremium audio is integrated throughout the ground floor, and a dedicated home theater room offers a more intimate space for movie nights, alongside a private gym for guests keeping up a routine while travelling.",
            },
            {
              title: "Bedrooms",
              body: "All five king bedrooms feature custom-built furniture, generous walk-in wardrobes, and en-suite bathrooms finished in imported natural stone. The primary suite includes a private balcony overlooking the pool, while the remaining four rooms are split across the estate's garden pavilion and a quieter second-floor wing.\n\nEach bedroom's air conditioning and lighting can be controlled independently for total guest comfort.",
            },
            {
              title: "In-Villa Chef & Pool",
              body: "Anaya Villa offers an in-villa chef and dedicated butler service as standard, turning the extra-large pool deck into a private dining venue for special occasions. The pool itself is the largest in the Le Marva collection, bordered by a sculpted sundeck built for both lounging and entertaining, with a separate staff villa keeping service discreet.",
            },
          ],
          id: [
            {
              title: "Tentang Villa",
              body: "Anaya Villa adalah properti unggulan Le Marva Canggu — estate lima kamar tidur seluas 500m² yang dibangun tanpa kompromi, dari kolam ekstra besar hingga perabotan kustom yang dirancang khusus untuk villa ini. Pilihan alami bagi tamu yang menginginkan yang terbaik dari estate ini.\n\nSetiap material dan finishing dipilih untuk daya tahan dan kemewahan yang tenang, dari lantai kayu jati finishing tangan hingga perlengkapan dari pengrajin perak Bali.",
            },
            {
              title: "Ruang Tamu",
              body: "Paviliun ruang tamu dan makan memiliki langit-langit tinggi ganda, dengan lampu gantung kustom dan meja makan dari satu lempeng kayu reclaimed. Dapur gourmet lengkap untuk in-villa chef, dilengkapi butler's pantry untuk katering diam-diam saat acara besar.\n\nAudio premium terpasang di seluruh lantai dasar, dan ruang home theater khusus menawarkan ruang lebih intim untuk malam nonton film, ditambah gym pribadi bagi tamu yang ingin tetap rutin berolahraga selama bepergian.",
            },
            {
              title: "Kamar Tidur",
              body: "Kelima kamar king memiliki furnitur buatan khusus, lemari walk-in yang luas, dan kamar mandi dalam berlapis batu alam impor. Kamar utama memiliki balkon pribadi menghadap kolam, sementara empat kamar lainnya terbagi di paviliun taman estate dan sayap lantai dua yang lebih tenang.\n\nAC dan pencahayaan setiap kamar dapat dikontrol secara independen untuk kenyamanan tamu sepenuhnya.",
            },
            {
              title: "In-Villa Chef & Kolam",
              body: "Anaya Villa menyertakan layanan in-villa chef dan butler khusus sebagai standar, mengubah dek kolam ekstra besar menjadi tempat makan pribadi untuk acara istimewa. Kolamnya sendiri adalah yang terbesar di koleksi Le Marva, dikelilingi dek berjemur berbentuk artistik untuk bersantai maupun menjamu tamu, dengan villa staf terpisah agar layanan tetap diskret.",
            },
          ],
        },
        facilities: [
          {
            label: { id: "Kolam Ekstra Besar", en: "Extra Large Pool" },
            icon: "pool",
          },
          { label: { id: "Audio Premium", en: "Premium Audio" }, icon: "tv" },
          { label: { id: "Home Theater", en: "Home Theater" }, icon: "tv" },
          { label: { id: "Gym Pribadi", en: "Private Gym" }, icon: "gym" },
          {
            label: { id: "WiFi Kecepatan Tinggi", en: "High-Speed WiFi" },
            icon: "wifi",
          },
          {
            label: { id: "Dapur Gourmet", en: "Gourmet Kitchen" },
            icon: "kitchen",
          },
          { label: { id: "Koki & Butler", en: "Chef & Butler" }, icon: "chef" },
          {
            label: { id: "Villa Staf", en: "Staff Villa" },
            icon: "staff",
          },
        ],
      },
    ],
  },
];

export const LOCATIONS = [
  "All Locations",
  "Canggu",
  "Ubud", // "Seminyak"
];
export const TYPES = ["All Types", "Villa", "Resort", "Apartment"];

export const DEFAULT_AMENITIES = [
  {
    label: { id: "Akses Kolam Pribadi", en: "Private Pool Access" },
    icon: "pool",
  },
  { label: { id: "Dapur Kecil", en: "Kitchenette" }, icon: "kitchen" },
  { label: { id: "Lemari Pakaian", en: "Wardrobe" }, icon: "wardrobe" },
  { label: { id: "Sandal", en: "Slippers" }, icon: "slippers" },
  { label: { id: "Smart TV", en: "Smart TV" }, icon: "tv" },
  { label: { id: "WiFi", en: "WiFi" }, icon: "wifi" },
  {
    label: { id: "Alat Pemadam Api", en: "Fire Extinguisher" },
    icon: "extinguisher",
  },
  { label: { id: "Kotak P3K", en: "First Aid Kit" }, icon: "firstaid" },
];

export const DEFAULT_RULES = {
  villaRules: {
    en: [
      "Check-in from 14:00 to 22:00",
      "Check-out from 08:00 to 12:00",
      "No age limit",
      "Children & bed policy applied",
    ],
    id: [
      "Check-in mulai 14:00 hingga 22:00",
      "Check-out mulai 08:00 hingga 12:00",
      "Tidak ada batasan usia",
      "Kebijakan anak & tempat tidur berlaku",
    ],
  },
  safety: {
    en: [
      "No smoking allowed in the room",
      "No loud noises between 22:00 and 07:00",
      "Pets are not allowed without prior notification",
    ],
    id: [
      "Dilarang merokok di dalam kamar",
      "Dilarang membuat suara keras antara pukul 22:00 dan 07:00",
      "Hewan peliharaan tidak diperbolehkan tanpa pemberitahuan sebelumnya",
    ],
  },
  cancellation: {
    en: [
      "Reschedule allowed, only for urgent circumstances",
      "Supporting document is required",
      "This rate is non-refundable",
    ],
    id: [
      "Penjadwalan ulang diperbolehkan, hanya untuk keadaan mendesak",
      "Dokumen pendukung diperlukan",
      "Tarif ini tidak dapat dikembalikan",
    ],
  },
};

export const DEFAULT_REVIEWS = [
  {
    name: "Andy P.",
    origin: "Indonesia",
    rating: 5.0,
    text: {
      en: "It was an enjoyable stay and we'd love to return again in the future. Leisure in the villa to enjoy the serenity, and the staff was very helpful and professional to attend our needs.",
      id: "Menginap yang menyenangkan dan kami ingin kembali lagi di masa depan. Bersantai di villa untuk menikmati ketenangan, dan staf sangat membantu serta profesional memenuhi kebutuhan kami.",
    },
  },
  {
    name: "Marcela",
    origin: "Uruguay",
    rating: 5.0,
    text: {
      en: "If you are looking for something tropical and hidden, out of the hustle and bustle, this is it. Friendly staff, comfy beds, and the breakfast was a holiday highlight on its own.",
      id: "Jika Anda mencari sesuatu yang tropis dan tersembunyi, jauh dari keramaian, inilah tempatnya. Staf ramah, tempat tidur nyaman, dan sarapannya sendiri menjadi momen favorit liburan kami.",
    },
  },
  {
    name: "Anthony",
    origin: "Australia",
    rating: 5.0,
    text: {
      en: "Staff were excellent throughout. Everything was exactly as described, and the housekeeping team kept the room immaculate every single day.",
      id: "Staf sangat baik sepanjang waktu. Semuanya persis seperti yang dideskripsikan, dan tim housekeeping menjaga kamar tetap bersih sempurna setiap hari.",
    },
  },
  {
    name: "Jen",
    origin: "Australia",
    rating: 5.0,
    text: {
      en: "We stayed four nights relaxing, enjoying the climate, and being in one spot. Didn't need to leave the property at all — it was a 10/10 for us.",
      id: "Kami menginap empat malam bersantai, menikmati cuaca, dan berada di satu tempat. Tidak perlu keluar properti sama sekali — ini sempurna bagi kami.",
    },
  },
];
