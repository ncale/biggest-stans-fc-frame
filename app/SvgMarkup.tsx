function SvgMarkup(username: string, userList: string[], totalReactionsList: number[]) {
    return (
        <div
            style={{
                fontFamily: 'Inter',
                height: '100%',
                width: '100%',
                display: 'flex',
                backgroundColor: '#fff',
                fontSize: 32,
                fontWeight: 600,
            }}>
            <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 15,
                marginLeft: 50
                }}>
                <h1>{username}{"'s Biggest Stans"}</h1>
                <ul
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 42,
                }}>
                <li>1. {userList[0]}... {totalReactionsList[0]} reactions</li>
                <li>2. {userList[1]}... {totalReactionsList[1]} reactions</li>
                <li>3. {userList[2]}... {totalReactionsList[2]} reactions</li>
                <li>4. {userList[3]}... {totalReactionsList[3]} reactions</li>
                <li>5. {userList[4]}... {totalReactionsList[4]} reactions</li>
                </ul>
            </div>
        </div>
    );
};
export default SvgMarkup;