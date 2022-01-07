/* eslint-disable @next/next/no-img-element */
import styles from '../../styles/Feed.module.css'
import { useRouter } from 'next/router'
import { Toolbar } from '../../components/toolbar'


export const Feed = ({pageNumber, articles})=>{

    const router = useRouter();
    console.log(articles)
    console.log(pageNumber)
    return(
        <div className='page-container'>
            <Toolbar />

            <div className={styles.main}>
                {articles.map((article, index) =>(
                    <div key={index} className={styles.post}> 
                        <h1 onClick={()=> (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} alt='article image'/>}
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>
                    <div 
                    onClick={()=>{
                        if (pageNumber > 1){
                            router.push(`/feed/${pageNumber - 1}`)
                            // next does this now, but if it didn't scroll back up to the top,
                            // you can attach a .then(() => window.scrollTo(0,0));
                        }
                    }}
                    className={pageNumber === 1? styles.disabled : styles.active}>
                        Previous Page
                    </div>

                    <div>#{pageNumber}</div>

                    <div 
                    onClick={()=>{
                        if (pageNumber < 5){
                            router.push(`/feed/${pageNumber + 1}`)
                            // next does this now, but if it didn't scroll back up to the top,
                            // you can attach a .then(() => window.scrollTo(0,0));
                        }
                    }}
                    className={pageNumber === 5? styles.disabled : styles.active}>
                        Next Page
                    </div>
            </div>

        </div>
    )
}

export const getServerSideProps = async pageContext =>{
    const pageNumber = pageContext.query.pageID;
    // console.log("YOOOOOOO", pageNumber)
    if (!pageNumber || pageNumber < 1 || pageNumber > 5){
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }


    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}&pageSize=5&page=${pageNumber}`
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