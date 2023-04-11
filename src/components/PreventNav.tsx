import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

interface PreventNavProps {
    targetPath: string;
    condition: boolean;
}

const PreventNav: React.FC<PreventNavProps> = ({targetPath, condition,}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies] = useCookies(["refreshToken"]);

    useEffect(() => {
        if (condition && location.pathname !== targetPath) {
            navigate(targetPath, { replace: true });
        }
    }, [condition, navigate, location, targetPath]);

    return null;
};

export default PreventNav;
