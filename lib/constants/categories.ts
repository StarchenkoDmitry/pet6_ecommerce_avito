export interface ICategory{
    name:string;
    url:string;
    subCategorys: ISubCategory[];
}

export interface ISubCategory{
    name:string;
    url:string;
}


const baseUrl = "/all";
export const categorys = createCategorys();


function createCategorys(){
    const ctgs: ICategory[] = [];

    const transport = createCategory("Transport","transport");
    createSubCategory(transport,"Drandulet","drandulet");
    createSubCategory(transport,"Трактор","traktor");
    createSubCategory(transport,"Super car","supercar");
    ctgs.push(transport);


    const laptop = createCategory("Ноутбук","laptop");
    createSubCategory(laptop,"Игровой Ноутбук","gaminglaptop");
    createSubCategory(laptop,"Ноутбук для бизнеса","bisneslaptop");
    ctgs.push(laptop);


    const rand1 = createCategory("Недвижимость","rfghdf678gh");
    createSubCategory(rand1,"Вторичка","tuityuil76ir67");
    createSubCategory(rand1,"Новостройки","drtyje56s5d6jj6");
    createSubCategory(rand1,"Квартиры","ser5je5jmr7m");
    createSubCategory(rand1,"Дома","rrtu57ymrumrftuym");
    createSubCategory(rand1,"Земельные участки","fukyuko34mab34tgbum9");


    const rand2 = createCategory("Услуги","rfghdf69gh");
    createSubCategory(rand2,"Автосервис","rtgh834u90h834um");
    createSubCategory(rand2,"Аренда авто","drtyjdm6dm85");
    createSubCategory(rand2,"Аренда оборудования","9uert0h3um40hmu");


    const rand3 = createCategory("Электроника","rfghd678uky9uktfgh");
    createSubCategory(rand3,"Телефоны","esrthnetrjhnertn");
    createSubCategory(rand3,"Аксессуары","dsrdrtyjrtfyrftkrtukr");
    createSubCategory(rand3,"Наушники","ed65uesdrtjmdrsujsrtuykrtuyemwsrtt6u");
    createSubCategory(rand3,"Монитры","wr7jkredjue56ertnuerune");
    createSubCategory(rand3,"Клавиатуры и мыши","4ws57w45y7kw45");


    const rand4 = createCategory("Работа","rfghdyuktyuktyuktfgh");
    createSubCategory(rand4,"Без опыта","rtyrjtyjrtyjrutyuo");
    createSubCategory(rand4,"Банки, инвестиции","sdrtghdrgtjdr7iseryuj");
    createSubCategory(rand4,"IT, интернет","rtyjrtuksetyjrtfyjdtry");


    ctgs.push(rand1);
    ctgs.push(rand2);
    ctgs.push(rand3);
    ctgs.push(rand4);

    
    return ctgs;
}


function createCategory(name:string,url:string):ICategory{
    const ctg : ICategory = {
        name:name,
        url:baseUrl + "/" + url,
        subCategorys:[],
    };
    return ctg;
}


function createSubCategory(perent:ICategory,name:string,url:string):ISubCategory{
    const subctg = {
        name:name,
        url:perent.url + "/" + url,
    };
    perent.subCategorys.push(subctg);
    return subctg;
}


// console.log("categorys",JSON.stringify(categorys));
// printCategories();

function printCategories(){
    console.log("list of cotigories:");
    categorys.map(c=>{
        console.log("Category: ",c.name,c.url);
        c.subCategorys.map(subc=>{
            console.log("sub: ",subc.name,subc.url);
        })
    })
}
