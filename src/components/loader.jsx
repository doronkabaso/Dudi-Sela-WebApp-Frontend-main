import ReactLoading from "react-loading"

export const Loader = () => {
    return (
        <div className="loader">
            <ReactLoading type={"spin"} color="#C9DB39" height={'20%'} width={'20%'} />
        </div>
    )
}