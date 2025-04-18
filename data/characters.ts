export type Character = {
    name: string;   // 캐릭터 이름
    rarity: number; // 성급 (2~6성)
    inspiration: string; // 영감
    engName?: string; // 영어 이름
  };
  
  // 성급별 캐릭터 리스트
  export const charactersByRarity: Record<number, Character[]> = {
    6: [
      { name: "드루비스", rarity: 6, inspiration: "plant", engName: "druvis-iii" },
      { name: "릴리아", rarity: 6, inspiration: "star", engName: "lilya" },
      { name: "A 나이트", rarity: 6, inspiration: "spirit", engName: "a-knight" },
      { name: "소더비", rarity: 6, inspiration: "plant", engName: "sotheby" },
      { name: "레굴루스", rarity: 6, inspiration: "star", engName: "regulus" },
      { name: "센츄리온", rarity: 6, inspiration: "beast", engName: "centurion" },
      { name: "안안 리", rarity: 6, inspiration: "plant", engName: "an-an-lee" },
      { name: "메디슨 포켓", rarity: 6, inspiration: "beast", engName: "medicine-pocket" },
      { name: "이터니티", rarity: 6, inspiration: "mineral", engName: "eternity" },
      { name: "뉴바벨", rarity: 6, inspiration: "mineral", engName: "ms-newbabel" },
      { name: "보이저", rarity: 6, inspiration: "star", engName: "voyager" },
      { name: "멜라니아", rarity: 6, inspiration: "beast", engName: "melania" },
      { name: "피클즈", rarity: 6, inspiration: "mineral", engName: "pickles" },
      { name: "투스 페어리", rarity: 6, inspiration: "star", engName: "tooth-fairy" },
      { name: "제시카", rarity: 6, inspiration: "plant", engName: "changeling" },
      { name: "갈라보나", rarity: 6, inspiration: "mineral", engName: "black-dwarf" },
      { name: "갈기 모래", rarity: 6, inspiration: "beast", engName: "shamane" },
      { name: "37", rarity: 6, inspiration: "star", engName: "37" },
      { name: "6", rarity: 6, inspiration: "intellect", engName: "6" },
      { name: "스파토데아", rarity: 6, inspiration: "beast", engName: "spathodea" },
      { name: "에즈라", rarity: 6, inspiration: "star", engName: "ezra-theodore" },
      { name: "갈천", rarity: 6, inspiration: "beast", engName: "getian" },
      { name: "제멜바이스", rarity: 6, inspiration: "mineral", engName: "semmelweis" },
      { name: "이졸데", rarity: 6, inspiration: "spirit", engName: "isolde" },
      { name: "마커스", rarity: 6, inspiration: "plant", engName: "marcus" },
      { name: "빌라", rarity: 6, inspiration: "plant", engName: "vila" },
      { name: "윈드송", rarity: 6, inspiration: "star", engName: "windsong" },
      { name: "카카니아", rarity: 6, inspiration: "plant", engName: "kakania" },
      { name: "머큐리아", rarity: 6, inspiration: "spirit", engName: "mercuria" },
      { name: "J", rarity: 6, inspiration: "beast", engName: "joe" },
      { name: "튜즈데이", rarity: 6, inspiration: "spirit", engName: "tuesday" },
      { name: "아르고스", rarity: 6, inspiration: "plant", engName: "argus" }
    ],
    5: [
      { name: "X", rarity: 5, inspiration: "intellect", engName: "x" },
      { name: "마릴린", rarity: 5, inspiration: "beast", engName: "sweetheart" },
      { name: "베이비 블루", rarity: 5, inspiration: "star", engName: "baby-blue" },
      { name: "찰리", rarity: 5, inspiration: "star", engName: "charlie" },
      { name: "콘블룸", rarity: 5, inspiration: "plant", engName: "bkornblume" },
      { name: "디케", rarity: 5, inspiration: "beast", engName: "dikke" },
      { name: "벌룬 파티", rarity: 5, inspiration: "mineral", engName: "balloon-party" },
      { name: "네크롤로지스트", rarity: 5, inspiration: "mineral", engName: "necrologist" },
      { name: "사츠키", rarity: 5, inspiration: "plant", engName: "satsuki" },
      { name: "테넌트", rarity: 5, inspiration: "beast", engName: "tennant" },
      { name: "클릭", rarity: 5, inspiration: "spirit", engName: "click" },
      { name: "블로니", rarity: 5, inspiration: "star", engName: "blonney" },
      { name: "호러피디아", rarity: 5, inspiration: "mineral", engName: "horropedia" },
      { name: "디거스", rarity: 5, inspiration: "plant", engName: "diggers" },
      { name: "칸지라", rarity: 5, inspiration: "plant", engName: "kanjira" },
      { name: "데저트 플란넬", rarity: 5, inspiration: "beast", engName: "desert-flannel" },
      { name: "울루", rarity: 5, inspiration: "mineral", engName: "ulu" },
      { name: "예니세이", rarity: 5, inspiration: "star", engName: "yenisei" },
      { name: "아브구스트", rarity: 5, inspiration: "plant", engName: "avgust" },
      { name: "던컨", rarity: 5, inspiration: "beast", engName: "mr-duncan" },
      { name: "바바라", rarity: 5, inspiration: "spirit", engName: "barbara" },
      // { name: "소네트", rarity: 5, inspiration: "mineral", engName: "sonetto" },
      // { name: "마틸다", rarity: 5, inspiration: "star", engName: "matilda" },
    ],
    4: [
      { name: "닉 보텀", rarity: 4, inspiration: "beast", engName: "nick-bottom" },
      { name: "이글", rarity: 4, inspiration: "plant", engName: "eagle" },
      { name: "겨울", rarity: 4, inspiration: "plant", engName: "winter" },
      { name: "바니바니", rarity: 4, inspiration: "beast", engName: "bunny-bunny" },
      { name: "파비아", rarity: 4, inspiration: "beast", engName: "pavia" },
      { name: "올리버 포그", rarity: 4, inspiration: "star", engName: "oliver-fog" },
      { name: "빨간 망토", rarity: 4, inspiration: "mineral", engName: "mondlicht" },
      { name: "APPLe", rarity: 4, inspiration: "star", engName: "apple" },
      { name: "크리스탈로", rarity: 4, inspiration: "mineral", engName: "cristallo" },
      { name: "레이비스", rarity: 4, inspiration: "plant", engName: "rabies" },
      { name: "무아상", rarity: 4, inspiration: "mineral", engName: "ms-moissan" },
      { name: "폴터가이스트", rarity: 4, inspiration: "spirit", engName: "poltergeist" },
      { name: "메스머 주니어", rarity: 4, inspiration: "intellect", engName: "mesmer-jr" },
      { name: "에릭", rarity: 4, inspiration: "star", engName: "erick" },
      { name: "TTT", rarity: 4, inspiration: "star", engName: "ttt" }
    ],
    3: [
      { name: "광대", rarity: 3, inspiration: "star", engName: "the-fool" },
      { name: "라 수르스", rarity: 3, inspiration: "plant", engName: "la-source" },
      { name: "에일리언 T", rarity: 3, inspiration: "star", engName: "alien-t" },
      { name: "레일라니", rarity: 3, inspiration: "beast", engName: "leilani" },
      { name: "존 티토", rarity: 3, inspiration: "intellect", engName: "john-titor" },
      { name: "리사&루이스", rarity: 3, inspiration: "spirit", engName: "twins-sleep" },
      { name: "베티", rarity: 3, inspiration: "mineral", engName: "bette" },
      { name: "다그닥 달리", rarity: 3, inspiration: "beast", engName: "darley-clatter" },
      { name: "어니언", rarity: 3, inspiration: "mineral", engName: "onion" },
      { name: "스푸트니크", rarity: 3, inspiration: "star", engName: "sputnik" },
      { name: "파이오니어", rarity: 3, inspiration: "spirit", engName: "pioneer" }
    ],
    2: [
      {name: "미스 라디오", rarity: 2, inspiration: "intellect", engName: "ms-radio"},
      {name: "문", rarity: 2, inspiration: "spirit", engName: "door"}
    ]
  };