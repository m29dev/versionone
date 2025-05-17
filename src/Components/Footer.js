const Footer = () => {
    return (
        <footer className="bg-transparent">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Version One. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
