export const Feed = ({pageNumber, articles})=>{
    console.log(articles)
    return(
        <>Hello World</>
    )
}

export const getServerSideProps = async pageContext =>{
    const pageNumber = pageContext.query.pageID;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5){
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }


    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}&pageSize=5&page=${pageNumber}}`
    );

    const apiJson = await apiResponse.json();

    // console.log(apiJson)

    const {articles} = apiJson;

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
}

export default Feed;