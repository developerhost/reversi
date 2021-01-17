export enum CellState {
  White = 'white',
  Black = 'black',
  None = 'none',
}

export class Cell {

  public x: number;
  public y: number;
  public state: CellState = CellState.None;

  constructor(x: number, y: number){
    this.x = x; //座標。それぞれのセルに番号を持たせる
    this.y = y;
  }

  public get isBlack(): boolean {
    return this.state === CellState.Black;
  }

  public get isWhite(): boolean {
    return this.state === CellState.White;
  }

  public get isNone(): boolean {
    return this.state === CellState.None;
  }
}

//座標のクラスを作成
export class Point {
  //本当はいらない部分
  public get isNone(): any {
    return this.state === CellState.None;
  }
  public state: CellState = CellState.None;
  //

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //範囲外をクリックしてしまった時
  public get inBoard() {
    return 0 <= this.x && this.x <= 7 && 0 <= this.y && this.y <= 7;
  }
}

export class Row {

  public cells: Cell[];
  public num: number; //cellの自分が何行目か持つ

  constructor(rowNumber: number) {
    this.num = rowNumber;
    this.cells = [...Array(8).keys()].map(i => new Cell(i, rowNumber));
  }
}





export class Board {

  public rows: Row[];
  public turn: CellState = CellState.Black; //交互に石を置いていく処理

  constructor(){
    this.rows = [...Array(8).keys()].map(i => new Row(i));//8列を定義
    this.rows[3].cells[3].state = CellState.White;
    this.rows[4].cells[4].state = CellState.White;
    this.rows[3].cells[4].state = CellState.Black;
    this.rows[4].cells[3].state = CellState.Black;
  }

  public put(p: Point) {
    if(!this.ref(p).isNone) { return } //すでに石が置いてあるなら何もしない

    console.log(this.search(p));

    //ひっくり返せないところ＝return
    const reversedList = this.search(p);
    if(reversedList.length === 0) { return }
    //ひっくり返す処理
    reversedList.forEach(p => this.ref(p).state = this.turn);
    
    this.ref(p).state = this.turn; //クリックで黒をおく

    //turnを反転させる
    if(this.turn === CellState.Black) {
       this.turn = CellState.White;
     } else {
       this.turn = CellState.Black;
      } 

  }

  //現在のセルを返す
  public ref(p: Point): Cell {
    return this.rows[p.y].cells[p.x];
  }

  //ある場所に石をおく時に、ひっくり返る石のリスト
  public search(p: Point): Point[] {
    const self = this;
    //再起的に探索するメソッド。nextは次に探索する場所を探すメソッド。
    const _search = (_p: Point, next: (pre: Point) => Point, lst: Point[]): Point[] => {
      const _next = next(_p);
      if(!_next.inBoard || self.ref(_next).isNone) {
        return [];
      }
      if (self.ref(_next).state !== self.turn){
        lst.push(_next);
        return _search(_next, next, lst);
      }
      return lst;
    }
    let result: Point[] = [];
    result = result.concat(_search(p, p => new Point(p.x, p.y + 1), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x, p.y - 1), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y + 1), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y + 1), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x + 1, p.y - 1), []));//concat=二つ以上の配列を結合
    result = result.concat(_search(p, p => new Point(p.x - 1, p.y - 1), []));//concat=二つ以上の配列を結合

    return result;
  }
}





