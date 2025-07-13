import GuestNavbar from '../components/navbars/GuestNavbar';

export default function HomePage() {
    return (
        <>
            <GuestNavbar/>

            <div className="flex h-screen items-center justify-center bg-gray-100">
                <p>Body of site</p>
            </div>
        </>
    );
}