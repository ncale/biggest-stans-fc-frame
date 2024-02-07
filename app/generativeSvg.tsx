export function makeSvgMarkup(username: string, userList: string[]) {
    <div
        style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#fff',
            fontSize: 32,
            fontWeight: 600,
    }}
    >
        <div
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 15,
            marginLeft: 50
            }}>
            <h1 style={{  }}>{}s Biggest Stans</h1>
            <ul
            style={{
                display: 'flex',
                flexDirection: 'column',

            }}>
            <li>1. {}</li>
            <li>2. {}</li>
            <li>3. {}</li>
            <li>4. {}</li>
            <li>5. {}</li>
            </ul>
        </div>
    </div>
};