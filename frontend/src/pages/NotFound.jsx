
// const NotFound = () => {
//     return ( 
//         <>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//             <h1>Page Not Pund</h1>
//         </>
//      );
// }

import { useLoaderData } from "react-router-dom";

 
// export default NotFound;

const NotFoundPage = () => {
    const user = useLoaderData();
    return (
      <>
        <div
          style={{
            position: 'relative',
            height: "calc(100% - 274px)",
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 767,
              width: '100%',
              lineHeight: 1.4,
              textAlign: 'center',
              padding: 15,
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 220,
              }}
            >
              <h1
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 186,
                  fontWeight: 200,
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                404
              </h1>
            </div>
            <h2
              style={{
                fontSize: 33,
                fontWeight: 200,
                textTransform: 'uppercase',
                marginBottom: 25,
                letterSpacing: 3,
              }}
            >
              Oops! Nothing was found
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 200,
                marginBottom: 25,
              }}
            >
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
              <br />
              <a
                href={`/${user.role}`}
                style={{
                  color: '#ff6f68',
                  fontWeight: 200,
                  textDecoration: 'none',
                  borderBottom: '1px dashed #ff6f68',
                  borderRadius: 2,
                }}
              >
                Return to homepage
              </a>
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export default NotFoundPage;
  