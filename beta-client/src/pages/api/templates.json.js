export async function get ({ params }){
    const tempdata = [
            {
                name: "ATS01",
                image: "/images/ats01.jpg",
                text: "This is a simple ATS CV template for entry level and intermidiate level resumes",
                tags: ["ats", "entry-level", "intermidiate-level"],
                page: "/cv-builder/templates/ats01"
            },
            {
                name: "MODERN01",
                image: "/images/modern01.jpg",
                text: "This is a simple MODERN CV template for entry level and intermidiate level resumes",
                tags: ["modern", "entry-level", "intermidiate-level"],
                page: "/cv-builder/templates/modern01"
            }
        ]

    return new Response(
        JSON.stringify(tempdata),
        {
            status:200,
            headers: { "Content-Type": "application/json; charset=utf-8"}
        }
    );
}
