//Items

static var itemID : String[] = ["Bois", "Chanvre", "Fer"];

static var itemPlayersAmount : int[] = [0, 0, 0];

static var itemBuyingAmount : int[] = [10, 20, 30];

static var itemSellingAmount : int[] = [5, 10, 15];

var itemTexture = new Texture[Besace.itemID.length];

//0 = Bois
//1 = Chanvre
//2 = Fer


function Start(){

var textures: Object[] = Resources.LoadAll("Materiaux", Texture2D);



for (var i = 0; i < textures.length; i++)

{

    itemTexture[i] = textures[i];
}}