export async function randomPic(){
const pics=[
"ng-1",
"ng-2",
"ng-3",
"ng",
"tw-1",
"tw-2",
"tw-3",
"tw-4",
"tw-5",
"tw-6",
"tw-7",
"tw-8",
"tw-9"
]

const random = Math.floor(Math.random() * pics.length);
return pics[random]
}

