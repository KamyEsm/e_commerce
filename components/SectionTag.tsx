

export default function SectionTag({title}: { title:string }){


    return (
        <div className="flex flex-row">
            <div className="w-4 h-12 bg-[#DB4444] m-4 rounded">
            </div>
            <h4 className="flex flex-col justify-center">
                {title}
            </h4>
        </div>
    )
}