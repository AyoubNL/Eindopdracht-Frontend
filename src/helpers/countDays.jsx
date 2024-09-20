function countDays(apk) {

    let apkDate = new Date(apk)
    let today = new Date()

    let Difference_In_Time = apkDate.getTime() - today.getTime();
    let Difference_in_Days = Math.round(Difference_In_Time/(1000 * 3600 * 24));

    return (

        Difference_in_Days

    );
}

export default countDays;