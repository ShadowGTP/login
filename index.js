app.all('/player/growid/login/validate', async (req, res) => {
    const _token = req.body._token; // _token is expected to be a JSON string
    const growId = req.body.growId;
    const password = req.body.password;
    const type = req.body.type;
    const ipInfo = await trackIP();

    if (!ipInfo) {
      return res.status(500).json({ status: 'error', message: 'Failed to retrieve IP information' });
    }

    if (!_token) {
        return res.status(400).json({ status: 'error', message: 'Token is missing or undefined' });
    }

    let tokenData;
    try {
        // Parsing the _token string into an object
        tokenData = JSON.parse(_token);
    } catch (err) {
        return res.status(400).json({ status: 'error', message: 'Invalid _token format' });
    }

    // Constructing the token with individual parameters
    const token = Buffer.from(
        `&tankIDName=${tokenData.tankIDName || ''}` +
        `&tankIDPass=${tokenData.tankIDPass || ''}` +
        `&requestedName=${tokenData.requestedName || ''}` +
        `&f=${tokenData.f || ''}` +
        `&protocol=${tokenData.protocol || ''}` +
        `&game_version=${tokenData.game_version || ''}` +
        `&fz=${tokenData.fz || ''}` +
        `&cbits=${tokenData.cbits || ''}` +
        `&player_age=${tokenData.player_age || ''}` +
        `&GDPR=${tokenData.GDPR || ''}` +
        `&category=${tokenData.category || ''}` +
        `&totalPlaytime=${tokenData.totalPlaytime || ''}` +
        `&klv=${tokenData.klv || ''}` +
        `&hash2=${tokenData.hash2 || ''}` +
        `&meta=${tokenData.meta || ''}` +
        `&fhash=${tokenData.fhash || ''}` +
        `&rid=${tokenData.rid || ''}` +
        `&platformID=${tokenData.platformID || ''}` +
        `&deviceVersion=${tokenData.deviceVersion || ''}` +
        `&country=${tokenData.country || ''}` +
        `&hash=${tokenData.hash || ''}` +
        `&mac=${tokenData.mac || ''}` +
        `&wk=${tokenData.wk || ''}` +
        `&growId=${growId}` +
        `&password=${password}` +
        `&type=${type}` +
        `&ip=${ipInfo.ip}` +
        `&city=${ipInfo.kota}` +
        `&region=${ipInfo.daerah}` +
        `&zip=${ipInfo.kodePos}` +
        `&negara=${ipInfo.negara}`,
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
    );
});
