import "./ModalPost.scss"


export const ModalPost = ({post, closeModal}) => {

    return(
        <div className="modal">
            <div className="modal__block">
                <p>id: {post.id}</p>
                <p>title: {post.title}</p>
                <p>content: {post.content}</p>
                <p>час створення: {post.created_at}</p>
                <button onClick={closeModal}>закрити</button>
            </div>
        </div>
    )  
}