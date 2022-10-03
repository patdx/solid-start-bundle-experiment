import manifestJSON from '__STATIC_CONTENT_MANIFEST';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var dist$1 = {};

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime$1() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] === '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = (ext[0] !== '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, '').toLowerCase();
  let ext = last.replace(/^.*\./, '').toLowerCase();

  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime$1;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["es","ecma"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/express":["exp"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/trig":["trig"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/step+xml":["stpx"],"model/step+zip":["stpz"],"model/step-xml+zip":["stpxz"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var other = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mapbox-vector-tile":["mvt"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-iwork-keynote-sffkey":["*key"],"application/x-iwork-numbers-sffnumbers":["*numbers"],"application/x-iwork-pages-sffpages":["*pages"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.sap.vds":["vds"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

let Mime = Mime_1;
var mime = new Mime(standard, other);

var types$1 = {};

Object.defineProperty(types$1, "__esModule", { value: true });
types$1.InternalError = types$1.NotFoundError = types$1.MethodNotAllowedError = types$1.KVError = void 0;
class KVError extends Error {
    constructor(message, status = 500) {
        super(message);
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = KVError.name; // stack traces display correctly now
        this.status = status;
    }
}
types$1.KVError = KVError;
class MethodNotAllowedError extends KVError {
    constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
    }
}
types$1.MethodNotAllowedError = MethodNotAllowedError;
class NotFoundError extends KVError {
    constructor(message = `Not Found`, status = 404) {
        super(message, status);
    }
}
types$1.NotFoundError = NotFoundError;
class InternalError extends KVError {
    constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
    }
}
types$1.InternalError = InternalError;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
	const mime$1 = mime;
	const types_1 = types$1;
	Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function () { return types_1.MethodNotAllowedError; } });
	Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return types_1.NotFoundError; } });
	Object.defineProperty(exports, "InternalError", { enumerable: true, get: function () { return types_1.InternalError; } });
	const defaultCacheControl = {
	    browserTTL: null,
	    edgeTTL: 2 * 60 * 60 * 24,
	    bypassCache: false, // do not bypass Cloudflare's cache
	};
	const parseStringAsObject = (maybeString) => typeof maybeString === 'string' ? JSON.parse(maybeString) : maybeString;
	const getAssetFromKVDefaultOptions = {
	    ASSET_NAMESPACE: typeof __STATIC_CONTENT !== 'undefined' ? __STATIC_CONTENT : undefined,
	    ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== 'undefined'
	        ? parseStringAsObject(__STATIC_CONTENT_MANIFEST)
	        : {},
	    cacheControl: defaultCacheControl,
	    defaultMimeType: 'text/plain',
	    defaultDocument: 'index.html',
	    pathIsEncoded: false,
	};
	function assignOptions(options) {
	    // Assign any missing options passed in to the default
	    // options.mapRequestToAsset is handled manually later
	    return Object.assign({}, getAssetFromKVDefaultOptions, options);
	}
	/**
	 * maps the path of incoming request to the request pathKey to look up
	 * in bucket and in cache
	 * e.g.  for a path '/' returns '/index.html' which serves
	 * the content of bucket/index.html
	 * @param {Request} request incoming request
	 */
	const mapRequestToAsset = (request, options) => {
	    options = assignOptions(options);
	    const parsedUrl = new URL(request.url);
	    let pathname = parsedUrl.pathname;
	    if (pathname.endsWith('/')) {
	        // If path looks like a directory append options.defaultDocument
	        // e.g. If path is /about/ -> /about/index.html
	        pathname = pathname.concat(options.defaultDocument);
	    }
	    else if (!mime$1.getType(pathname)) {
	        // If path doesn't look like valid content
	        //  e.g. /about.me ->  /about.me/index.html
	        pathname = pathname.concat('/' + options.defaultDocument);
	    }
	    parsedUrl.pathname = pathname;
	    return new Request(parsedUrl.toString(), request);
	};
	exports.mapRequestToAsset = mapRequestToAsset;
	/**
	 * maps the path of incoming request to /index.html if it evaluates to
	 * any HTML file.
	 * @param {Request} request incoming request
	 */
	function serveSinglePageApp(request, options) {
	    options = assignOptions(options);
	    // First apply the default handler, which already has logic to detect
	    // paths that should map to HTML files.
	    request = mapRequestToAsset(request, options);
	    const parsedUrl = new URL(request.url);
	    // Detect if the default handler decided to map to
	    // a HTML file in some specific directory.
	    if (parsedUrl.pathname.endsWith('.html')) {
	        // If expected HTML file was missing, just return the root index.html (or options.defaultDocument)
	        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
	    }
	    else {
	        // The default handler decided this is not an HTML page. It's probably
	        // an image, CSS, or JS file. Leave it as-is.
	        return request;
	    }
	}
	exports.serveSinglePageApp = serveSinglePageApp;
	const getAssetFromKV = async (event, options) => {
	    options = assignOptions(options);
	    const request = event.request;
	    const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
	    const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
	    if (typeof ASSET_NAMESPACE === 'undefined') {
	        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
	    }
	    const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, ''); // strip any preceding /'s
	    let pathIsEncoded = options.pathIsEncoded;
	    let requestKey;
	    // if options.mapRequestToAsset is explicitly passed in, always use it and assume user has own intentions
	    // otherwise handle request as normal, with default mapRequestToAsset below
	    if (options.mapRequestToAsset) {
	        requestKey = options.mapRequestToAsset(request);
	    }
	    else if (ASSET_MANIFEST[rawPathKey]) {
	        requestKey = request;
	    }
	    else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
	        pathIsEncoded = true;
	        requestKey = request;
	    }
	    else {
	        const mappedRequest = mapRequestToAsset(request);
	        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, '');
	        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
	            pathIsEncoded = true;
	            requestKey = mappedRequest;
	        }
	        else {
	            // use default mapRequestToAsset
	            requestKey = mapRequestToAsset(request, options);
	        }
	    }
	    const SUPPORTED_METHODS = ['GET', 'HEAD'];
	    if (!SUPPORTED_METHODS.includes(requestKey.method)) {
	        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
	    }
	    const parsedUrl = new URL(requestKey.url);
	    const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname; // decode percentage encoded path only when necessary
	    // pathKey is the file path to look up in the manifest
	    let pathKey = pathname.replace(/^\/+/, ''); // remove prepended /
	    // @ts-ignore
	    const cache = caches.default;
	    let mimeType = mime$1.getType(pathKey) || options.defaultMimeType;
	    if (mimeType.startsWith('text') || mimeType === 'application/javascript') {
	        mimeType += '; charset=utf-8';
	    }
	    let shouldEdgeCache = false; // false if storing in KV by raw file path i.e. no hash
	    // check manifest for map from file path to hash
	    if (typeof ASSET_MANIFEST !== 'undefined') {
	        if (ASSET_MANIFEST[pathKey]) {
	            pathKey = ASSET_MANIFEST[pathKey];
	            // if path key is in asset manifest, we can assume it contains a content hash and can be cached
	            shouldEdgeCache = true;
	        }
	    }
	    // TODO this excludes search params from cache, investigate ideal behavior
	    let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
	    // if argument passed in for cacheControl is a function then
	    // evaluate that function. otherwise return the Object passed in
	    // or default Object
	    const evalCacheOpts = (() => {
	        switch (typeof options.cacheControl) {
	            case 'function':
	                return options.cacheControl(request);
	            case 'object':
	                return options.cacheControl;
	            default:
	                return defaultCacheControl;
	        }
	    })();
	    // formats the etag depending on the response context. if the entityId
	    // is invalid, returns an empty string (instead of null) to prevent the
	    // the potentially disastrous scenario where the value of the Etag resp
	    // header is "null". Could be modified in future to base64 encode etc
	    const formatETag = (entityId = pathKey, validatorType = 'strong') => {
	        if (!entityId) {
	            return '';
	        }
	        switch (validatorType) {
	            case 'weak':
	                if (!entityId.startsWith('W/')) {
	                    return `W/${entityId}`;
	                }
	                return entityId;
	            case 'strong':
	                if (entityId.startsWith(`W/"`)) {
	                    entityId = entityId.replace('W/', '');
	                }
	                if (!entityId.endsWith(`"`)) {
	                    entityId = `"${entityId}"`;
	                }
	                return entityId;
	            default:
	                return '';
	        }
	    };
	    options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
	    // override shouldEdgeCache if options say to bypassCache
	    if (options.cacheControl.bypassCache ||
	        options.cacheControl.edgeTTL === null ||
	        request.method == 'HEAD') {
	        shouldEdgeCache = false;
	    }
	    // only set max-age if explicitly passed in a number as an arg
	    const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === 'number';
	    let response = null;
	    if (shouldEdgeCache) {
	        response = await cache.match(cacheKey);
	    }
	    if (response) {
	        if (response.status > 300 && response.status < 400) {
	            if (response.body && 'cancel' in Object.getPrototypeOf(response.body)) {
	                // Body exists and environment supports readable streams
	                response.body.cancel();
	            }
	            response = new Response(null, response);
	        }
	        else {
	            // fixes #165
	            let opts = {
	                headers: new Headers(response.headers),
	                status: 0,
	                statusText: '',
	            };
	            opts.headers.set('cf-cache-status', 'HIT');
	            if (response.status) {
	                opts.status = response.status;
	                opts.statusText = response.statusText;
	            }
	            else if (opts.headers.has('Content-Range')) {
	                opts.status = 206;
	                opts.statusText = 'Partial Content';
	            }
	            else {
	                opts.status = 200;
	                opts.statusText = 'OK';
	            }
	            response = new Response(response.body, opts);
	        }
	    }
	    else {
	        const body = await ASSET_NAMESPACE.get(pathKey, 'arrayBuffer');
	        if (body === null) {
	            throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
	        }
	        response = new Response(body);
	        if (shouldEdgeCache) {
	            response.headers.set('Accept-Ranges', 'bytes');
	            response.headers.set('Content-Length', body.length);
	            // set etag before cache insertion
	            if (!response.headers.has('etag')) {
	                response.headers.set('etag', formatETag(pathKey, 'strong'));
	            }
	            // determine Cloudflare cache behavior
	            response.headers.set('Cache-Control', `max-age=${options.cacheControl.edgeTTL}`);
	            event.waitUntil(cache.put(cacheKey, response.clone()));
	            response.headers.set('CF-Cache-Status', 'MISS');
	        }
	    }
	    response.headers.set('Content-Type', mimeType);
	    if (response.status === 304) {
	        let etag = formatETag(response.headers.get('etag'), 'strong');
	        let ifNoneMatch = cacheKey.headers.get('if-none-match');
	        let proxyCacheStatus = response.headers.get('CF-Cache-Status');
	        if (etag) {
	            if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === 'MISS') {
	                response.headers.set('CF-Cache-Status', 'EXPIRED');
	            }
	            else {
	                response.headers.set('CF-Cache-Status', 'REVALIDATED');
	            }
	            response.headers.set('etag', formatETag(etag, 'weak'));
	        }
	    }
	    if (shouldSetBrowserCache) {
	        response.headers.set('Cache-Control', `max-age=${options.cacheControl.browserTTL}`);
	    }
	    else {
	        response.headers.delete('Cache-Control');
	    }
	    return response;
	};
	exports.getAssetFromKV = getAssetFromKV;
} (dist$1));

var manifest = {
	"/": [
	{
		type: "script",
		href: "/assets/index.f572890e.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.0e635511.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.17ea8755.css"
	}
],
	"entry-client": [
	{
		type: "script",
		href: "/assets/entry-client.0e635511.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.17ea8755.css"
	}
],
	"index.html": [
]
};

const ERROR = Symbol("error");
const BRANCH = Symbol("branch");
function castError(err) {
  if (err instanceof Error || typeof err === "string") return err;
  return new Error("Unknown error");
}
function handleError$1(err) {
  err = castError(err);
  const fns = lookup(Owner, ERROR);
  if (!fns) throw err;
  for (const f of fns) f(err);
}
const UNOWNED = {
  context: null,
  owner: null
};
let Owner = null;
function createRoot(fn, detachedOwner) {
  detachedOwner && (Owner = detachedOwner);
  const owner = Owner,
        root = fn.length === 0 ? UNOWNED : {
    context: null,
    owner
  };
  Owner = root;
  let result;
  try {
    result = fn(() => {});
  } catch (err) {
    handleError$1(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function createComputed(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  try {
    fn(value);
  } catch (err) {
    handleError$1(err);
  } finally {
    Owner = Owner.owner;
  }
}
const createRenderEffect = createComputed;
function createMemo(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError$1(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function batch(fn) {
  return fn();
}
const untrack = batch;
function on(deps, fn, options = {}) {
  const isArray = Array.isArray(deps);
  const defer = options.defer;
  return () => {
    if (defer) return undefined;
    let value;
    if (isArray) {
      value = [];
      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
    } else value = deps();
    return fn(value);
  };
}
function onCleanup(fn) {
  let node;
  if (Owner && (node = lookup(Owner, BRANCH))) {
    if (!node.cleanups) node.cleanups = [fn];else node.cleanups.push(fn);
  }
  return fn;
}
function cleanNode(node) {
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = undefined;
  }
}
function onError(fn) {
  if (Owner) {
    if (Owner.context === null) Owner.context = {
      [ERROR]: [fn]
    };else if (!Owner.context[ERROR]) Owner.context[ERROR] = [fn];else Owner.context[ERROR].push(fn);
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
}
function getOwner() {
  return Owner;
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError$1(err);
  } finally {
    Owner = prev;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}

function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode$1(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? { ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
  return `${ctx.id}${ctx.count++}`;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}
function ErrorBoundary$1(props) {
  let error,
      res,
      clean,
      sync = true;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  function displayFallback() {
    cleanNode(clean);
    ctx.writeResource(id, error, true);
    setHydrateContext({ ...ctx,
      count: 0
    });
    const f = props.fallback;
    return typeof f === "function" && f.length ? f(error, () => {}) : f;
  }
  onError(err => {
    error = err;
    !sync && ctx.replace("e" + id, displayFallback);
    sync = true;
  });
  onCleanup(() => cleanNode(clean));
  createMemo(() => {
    Owner.context = {
      [BRANCH]: clean = {}
    };
    return res = props.children;
  });
  if (error) return displayFallback();
  sync = false;
  return {
    t: `<!e${id}>${resolveSSRNode$1(res)}<!/e${id}>`
  };
}
const SuspenseContext = createContext();
let resourceContext = null;
function createResource(source, fetcher, options = {}) {
  if (arguments.length === 2) {
    if (typeof fetcher === "object") {
      options = fetcher;
      fetcher = source;
      source = true;
    }
  } else if (arguments.length === 1) {
    fetcher = source;
    source = true;
  }
  const contexts = new Set();
  const id = sharedConfig.context.id + sharedConfig.context.count++;
  let resource = {};
  let value = options.storage ? options.storage(options.initialValue)[0]() : options.initialValue;
  let p;
  let error;
  if (sharedConfig.context.async && options.ssrLoadFrom !== "initial") {
    resource = sharedConfig.context.resources[id] || (sharedConfig.context.resources[id] = {});
    if (resource.ref) {
      if (!resource.data && !resource.ref[0].loading && !resource.ref[0].error) resource.ref[1].refetch();
      return resource.ref;
    }
  }
  const read = () => {
    if (error) throw error;
    if (resourceContext && p) resourceContext.push(p);
    const resolved = options.ssrLoadFrom !== "initial" && sharedConfig.context.async && "data" in sharedConfig.context.resources[id];
    if (!resolved && read.loading) {
      const ctx = useContext(SuspenseContext);
      if (ctx) {
        ctx.resources.set(id, read);
        contexts.add(ctx);
      }
    }
    return resolved ? sharedConfig.context.resources[id].data : value;
  };
  read.loading = false;
  read.error = undefined;
  read.state = "initialValue" in options ? "resolved" : "unresolved";
  Object.defineProperty(read, "latest", {
    get() {
      return read();
    }
  });
  function load() {
    const ctx = sharedConfig.context;
    if (!ctx.async) return read.loading = !!(typeof source === "function" ? source() : source);
    if (ctx.resources && id in ctx.resources && "data" in ctx.resources[id]) {
      value = ctx.resources[id].data;
      return;
    }
    resourceContext = [];
    const lookup = typeof source === "function" ? source() : source;
    if (resourceContext.length) {
      p = Promise.all(resourceContext).then(() => fetcher(source(), {
        value
      }));
    }
    resourceContext = null;
    if (!p) {
      if (lookup == null || lookup === false) return;
      p = fetcher(lookup, {
        value
      });
    }
    if (p != undefined && typeof p === "object" && "then" in p) {
      read.loading = true;
      read.state = "pending";
      if (ctx.writeResource) ctx.writeResource(id, p, undefined, options.deferStream);
      return p.then(res => {
        read.loading = false;
        read.state = "resolved";
        ctx.resources[id].data = res;
        p = null;
        notifySuspense(contexts);
        return res;
      }).catch(err => {
        read.loading = false;
        read.state = "errored";
        read.error = error = castError(err);
        p = null;
        notifySuspense(contexts);
      });
    }
    ctx.resources[id].data = p;
    if (ctx.writeResource) ctx.writeResource(id, p);
    p = null;
    return ctx.resources[id].data;
  }
  if (options.ssrLoadFrom !== "initial") load();
  return resource.ref = [read, {
    refetch: load,
    mutate: v => value = v
  }];
}
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function notifySuspense(contexts) {
  for (const c of contexts) {
    if (suspenseComplete(c)) c.completed();
  }
  contexts.clear();
}
function useTransition() {
  return [() => false, fn => {
    fn();
  }];
}
function Suspense(props) {
  let done;
  let clean;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  const o = Owner;
  if (o) {
    if (o.context) o.context[BRANCH] = clean = {};else o.context = {
      [BRANCH]: clean = {}
    };
  }
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(res));
      }
    }
  });
  function runSuspense() {
    setHydrateContext({ ...ctx,
      count: 0
    });
    return runWithOwner(o, () => {
      return createComponent(SuspenseContext.Provider, {
        value,
        get children() {
          clean && cleanNode(clean);
          return props.children;
        }
      });
    });
  }
  const res = runSuspense();
  if (suspenseComplete(value)) return res;
  onError(err => {
    if (!done || !done(undefined, err)) {
      if (o) runWithOwner(o.owner, () => {
        throw err;
      });else throw err;
    }
  });
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  if (ctx.async) {
    setHydrateContext({ ...ctx,
      count: 0,
      id: ctx.id + "0.f",
      noHydrate: true
    });
    const res = {
      t: `<span id="pl-${id}">${resolveSSRNode$1(props.fallback)}</span>`
    };
    setHydrateContext(ctx);
    return res;
  }
  setHydrateContext({ ...ctx,
    count: 0,
    id: ctx.id + "0.f"
  });
  ctx.writeResource(id, "$$f");
  return props.fallback;
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = {
  className: "class",
  htmlFor: "for"
};

const {
  hasOwnProperty: hasOwnProperty$1
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push("))");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty$1.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}

const REPLACE_SCRIPT = `function $df(e,t,d,l){d=document.getElementById(e),(l=document.getElementById("pl-"+e))&&l.replaceWith(...d.childNodes),d.remove(),_$HY.set(e,t)}`;
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId
  } = options;
  const blockingResources = [];
  const registry = new Map();
  const dedupe = new WeakMap();
  const checkEnd = () => {
    if (!registry.size && !completed) {
      writeTasks();
      onCompleteAll && onCompleteAll({
        write(v) {
          !completed && buffer.write(v);
        }
      });
      writable && writable.end();
      completed = true;
    }
  };
  const pushTask = task => {
    tasks += task + ";";
    if (!scheduled && firstFlushed) {
      Promise.resolve().then(writeTasks);
      scheduled = true;
    }
  };
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    scheduled = false;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let scriptFlushed = false;
  let scheduled = true;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingResources.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!${id}>`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!/${id}>`, first + placeholder.length);
      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
    },
    writeResource(id, p, error, wait) {
      if (error) return pushTask(serializeSet(dedupe, id, p, serializeError));
      if (!p || typeof p !== "object" || !("then" in p)) return pushTask(serializeSet(dedupe, id, p));
      if (!firstFlushed) wait && blockingResources.push(p);else pushTask(`_$HY.init("${id}")`);
      p.then(d => {
        !completed && pushTask(serializeSet(dedupe, id, d));
      }).catch(() => {
        !completed && pushTask(`_$HY.set("${id}", {})`);
      });
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        registry.set(key, []);
        firstFlushed && pushTask(`_$HY.init("${key}")`);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const keys = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) return;
          if ((value !== undefined || error) && !completed) {
            if (!firstFlushed) {
              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              error && pushTask(serializeSet(dedupe, key, error, serializeError));
            } else {
              buffer.write(`<div hidden id="${key}">${value !== undefined ? value : " "}</div>`);
              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + serializeError(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              scriptFlushed = true;
            }
          }
        }
        if (!registry.size) Promise.resolve().then(checkEnd);
        return firstFlushed;
      };
    }
  };
  let html = resolveSSRNode(escape(code()));
  function doShell() {
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    for (const key in context.resources) {
      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
    }
    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    scheduled = false;
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
  }
  return {
    then(fn) {
      function complete() {
        doShell();
        fn(tmp);
      }
      if (onCompleteAll) {
        ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      if (!registry.size) Promise.resolve().then(checkEnd);
    },
    pipe(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        buffer = writable = w;
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    },
    pipeTo(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        const encoder = new TextEncoder();
        const writer = w.getWriter();
        writable = {
          end() {
            writer.releaseLock();
            w.close();
          }
        };
        buffer = {
          write(payload) {
            writer.write(encoder.encode(payload));
          }
        };
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    }
  };
}
function Assets(props) {
  useAssets(() => props.children);
}
function HydrationScript(props) {
  const {
    nonce
  } = sharedConfig.context;
  return ssr(generateHydrationScript({
    nonce,
    ...props
  }));
}
function NoHydration(props) {
  const c = sharedConfig.context;
  c.noHydrate = true;
  const children = props.children;
  c.noHydrate = false;
  return children;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
      result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
          classValue = !!value[key];
    if (!key || !classValue) continue;
    i && (result += " ");
    result += key;
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    if (i) result += ";";
    result += `${s}:${escape(value[s], true)}`;
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const keys = Object.keys(props);
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${(n = props.class) ? n + " " : ""}${(n = props.className) ? n + " " : ""}${ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  return {
    t: result + `>${resolveSSRNode(children)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
      out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function useAssets(fn) {
  sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>var e,t;e=window._$HY||(_$HY={events:[],completed:new WeakSet,r:{}}),t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host instanceof Node?e.host:e.parentNode)),["${eventNames.join('","')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])})))),e.init=(t,o)=>{e.r[t]=[new Promise(((e,t)=>o=e)),o]},e.set=(t,o,s)=>{(s=e.r[t])&&s[1](o),e.r[t]=[o]},e.unset=t=>{delete e.r[t]},e.load=t=>e.r[t];</script><!--xs-->`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) {
      registry.get(k).push(key);
      return true;
    }
  }
  return false;
}
function serializeSet(registry, key, value, serializer = stringify) {
  const exist = registry.get(value);
  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
  value !== null && typeof value === "object" && registry.set(value, key);
  return `_$HY.set("${key}", ${serializer(value)})`;
}
function replacePlaceholder(html, key, value) {
  const nextRegex = /(<[/]?span[^>]*>)/g;
  const marker = `<span id="pl-${key}">`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  nextRegex.lastIndex = first + marker.length;
  let match;
  let open = 0,
      close = 0;
  while (match = nextRegex.exec(html)) {
    if (match[0][1] === "/") {
      close++;
      if (close > open) break;
    } else open++;
  }
  return html.slice(0, first) + value + html.slice(nextRegex.lastIndex);
}

const isServer = true;

var dist = {};

var browserPonyfill = {exports: {}};

(function (module, exports) {
	var global = typeof self !== 'undefined' ? self : commonjsGlobal;
	var __self__ = (function () {
	function F() {
	this.fetch = false;
	this.DOMException = global.DOMException;
	}
	F.prototype = global;
	return new F();
	})();
	(function(self) {

	((function (exports) {

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob:
	      'FileReader' in self &&
	      'Blob' in self &&
	      (function() {
	        try {
	          new Blob();
	          return true
	        } catch (e) {
	          return false
	        }
	      })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function isDataView(obj) {
	    return obj && DataView.prototype.isPrototypeOf(obj)
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ];

	    var isArrayBufferView =
	      ArrayBuffer.isView ||
	      function(obj) {
	        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	      };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift();
	        return {done: value === undefined, value: value}
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      };
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1]);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var oldValue = this.map[name];
	    this.map[name] = oldValue ? oldValue + ', ' + value : value;
	  };

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name);
	    return this.has(name) ? this.map[name] : null
	  };

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  };

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value);
	  };

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this);
	      }
	    }
	  };

	  Headers.prototype.keys = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.values = function() {
	    var items = [];
	    this.forEach(function(value) {
	      items.push(value);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.entries = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items)
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result);
	      };
	      reader.onerror = function() {
	        reject(reader.error);
	      };
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function(body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        this._bodyText = body = Object.prototype.toString.call(body);
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      };

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      };
	    }

	    this.text = function() {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    };

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      };
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    };

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      this.signal = input.signal;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = String(input);
	    }

	    this.credentials = options.credentials || this.credentials || 'same-origin';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.signal = options.signal || this.signal;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, {body: this._bodyInit})
	  };

	  function decode(body) {
	    var form = new FormData();
	    body
	      .trim()
	      .split('&')
	      .forEach(function(bytes) {
	        if (bytes) {
	          var split = bytes.split('=');
	          var name = split.shift().replace(/\+/g, ' ');
	          var value = split.join('=').replace(/\+/g, ' ');
	          form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	      });
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	    // https://tools.ietf.org/html/rfc7230#section-3.2
	    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status === undefined ? 200 : options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  };

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''});
	    response.type = 'error';
	    return response
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  };

	  exports.DOMException = self.DOMException;
	  try {
	    new exports.DOMException();
	  } catch (err) {
	    exports.DOMException = function(message, name) {
	      this.message = message;
	      this.name = name;
	      var error = Error(message);
	      this.stack = error.stack;
	    };
	    exports.DOMException.prototype = Object.create(Error.prototype);
	    exports.DOMException.prototype.constructor = exports.DOMException;
	  }

	  function fetch(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init);

	      if (request.signal && request.signal.aborted) {
	        return reject(new exports.DOMException('Aborted', 'AbortError'))
	      }

	      var xhr = new XMLHttpRequest();

	      function abortXhr() {
	        xhr.abort();
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.onabort = function() {
	        reject(new exports.DOMException('Aborted', 'AbortError'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      } else if (request.credentials === 'omit') {
	        xhr.withCredentials = false;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      if (request.signal) {
	        request.signal.addEventListener('abort', abortXhr);

	        xhr.onreadystatechange = function() {
	          // DONE (success or failure)
	          if (xhr.readyState === 4) {
	            request.signal.removeEventListener('abort', abortXhr);
	          }
	        };
	      }

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    })
	  }

	  fetch.polyfill = true;

	  if (!self.fetch) {
	    self.fetch = fetch;
	    self.Headers = Headers;
	    self.Request = Request;
	    self.Response = Response;
	  }

	  exports.Headers = Headers;
	  exports.Request = Request;
	  exports.Response = Response;
	  exports.fetch = fetch;

	  Object.defineProperty(exports, '__esModule', { value: true });

	  return exports;

	}))({});
	})(__self__);
	__self__.fetch.ponyfill = true;
	// Remove "polyfill" property added by whatwg-fetch
	delete __self__.fetch.polyfill;
	// Choose between native implementation (global) or custom implementation (__self__)
	// var ctx = global.fetch ? global : __self__;
	var ctx = __self__; // this line disable service worker support temporarily
	exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
	exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
	exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
	exports.Headers = ctx.Headers;
	exports.Request = ctx.Request;
	exports.Response = ctx.Response;
	module.exports = exports;
} (browserPonyfill, browserPonyfill.exports));

/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null;
}

function invariant$1(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(
      message != null ? message : 'Unexpected invariant triggered.',
    );
  }
}

const LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;

  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === 'number' || invariant$1(false);

    if (match.index >= position) {
      break;
    }

    lastLineStart = match.index + match[0].length;
    line += 1;
  }

  return {
    line,
    column: position + 1 - lastLineStart,
  };
}

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start),
  );
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = ''.padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];

    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
        ['|', '^'.padStart(subLineColumnNum)],
        ['|', subLines[subLineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ['|', '^'.padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
    .join('\n');
}

function toNormalizedOptions(args) {
  const firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5],
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

class GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;

    const { nodes, source, positions, path, originalError, extensions } =
      toNormalizedOptions(rawArgs);
    super(message);
    this.name = 'GraphQLError';
    this.path = path !== null && path !== void 0 ? path : undefined;
    this.originalError =
      originalError !== null && originalError !== void 0
        ? originalError
        : undefined; // Compute list of blame nodes.

    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0
        ? void 0
        : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
    ); // Compute locations in the source for the given nodes/positions.

    this.source =
      source !== null && source !== void 0
        ? source
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : (_nodeLocations$ = nodeLocations[0]) === null ||
          _nodeLocations$ === void 0
        ? void 0
        : _nodeLocations$.source;
    this.positions =
      positions !== null && positions !== void 0
        ? positions
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => loc.start);
    this.locations =
      positions && source
        ? positions.map((pos) => getLocation(source, pos))
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions,
    )
      ? originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions
      : undefined;
    this.extensions =
      (_ref =
        extensions !== null && extensions !== void 0
          ? extensions
          : originalExtensions) !== null && _ref !== void 0
        ? _ref
        : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true,
      },
      name: {
        enumerable: false,
      },
      nodes: {
        enumerable: false,
      },
      source: {
        enumerable: false,
      },
      positions: {
        enumerable: false,
      },
      originalError: {
        enumerable: false,
      },
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (
      originalError !== null &&
      originalError !== void 0 &&
      originalError.stack
    ) {
      Object.defineProperty(this, 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true,
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true,
      });
    }
    /* c8 ignore stop */
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLError';
  }

  toString() {
    let output = this.message;

    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += '\n\n' + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += '\n\n' + printSourceLocation(this.source, location);
      }
    }

    return output;
  }

  toJSON() {
    const formattedError = {
      message: this.message,
    };

    if (this.locations != null) {
      formattedError.locations = this.locations;
    }

    if (this.path != null) {
      formattedError.path = this.path;
    }

    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }

    return formattedError;
  }
}

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position],
  });
}

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

var OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation$1;

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation$1 || (DirectiveLocation$1 = {}));
/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));
/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */

/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit$1(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit$1(code) || code === 0x005f;
}

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace$1(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace$1(str) {
  let i = 0;

  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString$1(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind;

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));
/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */

/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

class Lexer {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Lexer';
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */

  advance() {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */

  lookahead() {
    let token = this.token;

    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          // Read the next token and form a link in the token linked-list.
          const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

          token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }

    return token;
  }
}
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return (
    kind === TokenKind.BANG ||
    kind === TokenKind.DOLLAR ||
    kind === TokenKind.AMP ||
    kind === TokenKind.PAREN_L ||
    kind === TokenKind.PAREN_R ||
    kind === TokenKind.SPREAD ||
    kind === TokenKind.COLON ||
    kind === TokenKind.EQUALS ||
    kind === TokenKind.AT ||
    kind === TokenKind.BRACKET_L ||
    kind === TokenKind.BRACKET_R ||
    kind === TokenKind.BRACE_L ||
    kind === TokenKind.PIPE ||
    kind === TokenKind.BRACE_R
  );
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */

function isUnicodeScalarValue(code) {
  return (
    (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
  );
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */

function isSupplementaryCodePoint(body, location) {
  return (
    isLeadingSurrogate(body.charCodeAt(location)) &&
    isTrailingSurrogate(body.charCodeAt(location + 1))
  );
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */

function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    const char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : `"${char}"`;
  } // Unicode code point

  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */

function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */

function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (
          body.charCodeAt(position + 1) === 0x002e &&
          body.charCodeAt(position + 2) === 0x002e
        ) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)

    if (isDigit$1(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name

    if (isNameStart(code)) {
      return readName(lexer, position);
    }

    throw syntaxError(
      lexer.source,
      position,
      code === 0x0027
        ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
        : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
        ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
        : `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */

function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position),
  );
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */

function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)

  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if (isDigit$1(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)

  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e

  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart

  if (code === 0x002e || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
    );
  }

  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position),
  );
}
/**
 * Returns the new position in the source after reading one or more digits.
 */

function readDigits(lexer, start, firstCode) {
  if (!isDigit$1(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
    );
  }

  const body = lexer.source.body;
  let position = start + 1; // +1 to skip first firstCode

  while (isDigit$1(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */

function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = '';

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)

    if (code === 0x005c) {
      value += body.slice(chunkStart, position);
      const escape =
        body.charCodeAt(position + 1) === 0x0075 // u
          ? body.charCodeAt(position + 2) === 0x007b // {
            ? readEscapedUnicodeVariableWidth(lexer, position)
            : readEscapedUnicodeFixedWidth(lexer, position)
          : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.

function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    const code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size,
      };
    } // Append this hex digit to the code point.

    point = (point << 4) | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
  );
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6,
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.

  if (isLeadingSurrogate(code)) {
    // \u
    if (
      body.charCodeAt(position + 6) === 0x005c &&
      body.charCodeAt(position + 7) === 0x0075
    ) {
      const trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12,
        };
      }
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
  );
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */

function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return (
    (readHexDigit(body.charCodeAt(position)) << 12) |
    (readHexDigit(body.charCodeAt(position + 1)) << 8) |
    (readHexDigit(body.charCodeAt(position + 2)) << 4) |
    readHexDigit(body.charCodeAt(position + 3))
  );
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */

function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
    ? code - 0x0030
    : code >= 0x0041 && code <= 0x0046 // A-F
    ? code - 0x0037
    : code >= 0x0061 && code <= 0x0066 // a-f
    ? code - 0x0057
    : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */

function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: '\u0022',
        size: 2,
      };

    case 0x005c:
      // \
      return {
        value: '\u005c',
        size: 2,
      };

    case 0x002f:
      // /
      return {
        value: '\u002f',
        size: 2,
      };

    case 0x0062:
      // b
      return {
        value: '\u0008',
        size: 2,
      };

    case 0x0066:
      // f
      return {
        value: '\u000c',
        size: 2,
      };

    case 0x006e:
      // n
      return {
        value: '\u000a',
        size: 2,
      };

    case 0x0072:
      // r
      return {
        value: '\u000d',
        size: 2,
      };

    case 0x0074:
      // t
      return {
        value: '\u0009',
        size: 2,
      };
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
  );
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */

function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = '';
  const blockLines = [];

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (
      code === 0x0022 &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3, // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join('\n'),
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")

    if (
      code === 0x005c &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022 &&
      body.charCodeAt(position + 3) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator

    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */

function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position);

    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position),
  );
}

function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}

const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH$1 = 2;
/**
 * Used to print values in error messages.
 */

function inspect$1(value) {
  return formatValue$1(value, []);
}

function formatValue$1(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue$1(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue$1(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable$1(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue$1(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray$1(value, seenValues);
  }

  return formatObject$1(value, seenValues);
}

function isJSONable$1(value) {
  return typeof value.toJSON === 'function';
}

function formatObject$1(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH$1) {
    return '[' + getObjectTag$1(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue$1(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray$1(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH$1) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue$1(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag$1(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */

const instanceOf =
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }

        if (typeof value === 'object' && value !== null) {
          var _value$constructor;

          // Prefer Symbol.toStringTag since it is immune to minification.
          const className = constructor.prototype[Symbol.toStringTag];
          const valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
            Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
              ? value[Symbol.toStringTag]
              : (_value$constructor = value.constructor) === null ||
                _value$constructor === void 0
              ? void 0
              : _value$constructor.name;

          if (className === valueClassName) {
            const stringifiedValue = inspect$1(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }

        return false;
      };

/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
class Source {
  constructor(
    body,
    name = 'GraphQL request',
    locationOffset = {
      line: 1,
      column: 1,
    },
  ) {
    typeof body === 'string' ||
      devAssert(false, `Body must be a string. Received: ${inspect$1(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 ||
      devAssert(
        false,
        'line in locationOffset is 1-indexed and must be positive.',
      );
    this.locationOffset.column > 0 ||
      devAssert(
        false,
        'column in locationOffset is 1-indexed and must be positive.',
      );
  }

  get [Symbol.toStringTag]() {
    return 'Source';
  }
}
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */

function isSource(source) {
  return instanceOf(source, Source);
}

/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */

function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(TokenKind.EOF);
  return value;
}
/**
 * Similar to parseValue(), but raises a parse error if it encounters a
 * variable. The return type will be a constant value.
 */

function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */

function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(TokenKind.EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

class Parser {
  constructor(source, options = {}) {
    const sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */

  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value,
    });
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */

  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF,
      ),
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */

  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } // Many definitions begin with a description and require a lookahead.

    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription
      ? this._lexer.lookahead()
      : this._lexer.token;

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }

      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          'Unexpected description, descriptions are supported only on type definitions.',
        );
      }

      switch (keywordToken.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    }

    throw this.unexpected(keywordToken);
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */

  parseOperationDefinition() {
    const start = this._lexer.token;

    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    }

    const operation = this.parseOperationType();
    let name;

    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }

    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */

  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return OperationTypeNode.QUERY;

      case 'mutation':
        return OperationTypeNode.MUTATION;

      case 'subscription':
        return OperationTypeNode.SUBSCRIPTION;
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */

  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R,
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */

  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS)
        ? this.parseConstValueLiteral()
        : undefined,
      directives: this.parseConstDirectives(),
    });
  }
  /**
   * Variable : $ Name
   */

  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName(),
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */

  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R,
      ),
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */

  parseSelection() {
    return this.peek(TokenKind.SPREAD)
      ? this.parseFragment()
      : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */

  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;

    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L)
        ? this.parseSelectionSet()
        : undefined,
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */

  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */

  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst),
    });
  }

  parseConstArgument() {
    return this.parseArgument(true);
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */

  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
      });
    }

    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */

  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
      });
    }

    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentName : Name but not `on`
   */

  parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseValueLiteral(isConst) {
    const token = this._lexer.token;

    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value,
        });

      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value,
        });

      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case TokenKind.NAME:
        this.advanceLexer();

        switch (token.value) {
          case 'true':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true,
            });

          case 'false':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false,
            });

          case 'null':
            return this.node(token, {
              kind: Kind.NULL,
            });

          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value,
            });
        }

      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);

          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`,
            );
          } else {
            throw this.unexpected(token);
          }
        }

        return this.parseVariable();

      default:
        throw this.unexpected();
    }
  }

  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }

  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */

  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */

  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */

  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
    });
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */

  parseDirectives(isConst) {
    const directives = [];

    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }

  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */

  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
    });
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */

  parseTypeReference() {
    const start = this._lexer.token;
    let type;

    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType,
      });
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type,
      });
    }

    return type;
  }
  /**
   * NamedType : Name
   */

  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
    });
  } // Implements the parsing rules in the Type Definition section.

  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */

  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */

  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */

  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */

  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */

  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */

  parseImplementsInterfaces() {
    return this.expectOptionalKeyword('implements')
      ? this.delimitedMany(TokenKind.AMP, this.parseNamedType)
      : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */

  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */

  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */

  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R,
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */

  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;

    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }

    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */

  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */

  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */

  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS)
      ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType)
      : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */

  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */

  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */

  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseEnumValueName() {
    if (
      this._lexer.token.value === 'true' ||
      this._lexer.token.value === 'false' ||
      this._lexer.token.value === 'null'
    ) {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
      );
    }

    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */

  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */

  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R,
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */

  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */

  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */

  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */

  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */

  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */

  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */

  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */

  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */

  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */

  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */

  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();

    if (Object.prototype.hasOwnProperty.call(DirectiveLocation$1, name.value)) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */

  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source,
      );
    }

    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */

  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }

    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`,
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */

  unexpected(atToken) {
    const token =
      atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`,
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */

  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  }

  advanceLexer() {
    const { maxTokens } = this._options;

    const token = this._lexer.advance();

    if (maxTokens !== undefined && token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;

      if (this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`,
        );
      }
    }
  }
}
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */

function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

var parser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	parse: parse,
	parseValue: parseValue,
	parseConstValue: parseConstValue,
	parseType: parseType,
	Parser: Parser
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(parser);

/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
} // eslint-disable-next-line no-control-regex

const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore

const escapeSequences = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000B',
  '\\f',
  '\\r',
  '\\u000E',
  '\\u000F',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001A',
  '\\u001B',
  '\\u001C',
  '\\u001D',
  '\\u001E',
  '\\u001F',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 2F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 3F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 4F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
  '',
  '',
  '', // 5F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 6F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\u007F',
  '\\u0080',
  '\\u0081',
  '\\u0082',
  '\\u0083',
  '\\u0084',
  '\\u0085',
  '\\u0086',
  '\\u0087',
  '\\u0088',
  '\\u0089',
  '\\u008A',
  '\\u008B',
  '\\u008C',
  '\\u008D',
  '\\u008E',
  '\\u008F',
  '\\u0090',
  '\\u0091',
  '\\u0092',
  '\\u0093',
  '\\u0094',
  '\\u0095',
  '\\u0096',
  '\\u0097',
  '\\u0098',
  '\\u0099',
  '\\u009A',
  '\\u009B',
  '\\u009C',
  '\\u009D',
  '\\u009E',
  '\\u009F',
];

/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

const BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = new Map();

  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */

  let stack = undefined;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = undefined;
  let parent = undefined;
  const path = [];
  const ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;

          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;

            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node),
          );

          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    let result;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect$1(node)}.`);
      const visitFn = isLeaving
        ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get === void 0
          ? void 0
          : _enterLeaveMap$get.leave
        : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get2 === void 0
        ? void 0
        : _enterLeaveMap$get2.enter;
      result =
        visitFn === null || visitFn === void 0
          ? void 0
          : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack,
      };
      inArray = Array.isArray(node);
      keys = inArray
        ? node
        : (_node$kind = visitorKeys[node.kind]) !== null &&
          _node$kind !== void 0
        ? _node$kind
        : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = Object.create(null);

  for (const kind of Object.values(Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(undefined);
    const leaveList = new Array(visitors.length).fill(undefined);

    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }

    if (!hasVisitor) {
      continue;
    }

    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;

            const result =
              (_enterList$i = enterList[i]) === null || _enterList$i === void 0
                ? void 0
                : _enterList$i.apply(visitors[i], args);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      },

      leave(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;

            const result =
              (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0
                ? void 0
                : _leaveList$i.apply(visitors[i], args);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      },
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }

  return mergedVisitor;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */

function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];

  if (typeof kindVisitor === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined,
    };
  } // { enter() {}, leave() {} }

  return {
    enter: visitor.enter,
    leave: visitor.leave,
  };
}

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return visit(ast, printDocASTReducer$1);
}
const MAX_LINE_LENGTH$1 = 80;
const printDocASTReducer$1 = {
  Name: {
    leave: (node) => node.value,
  },
  Variable: {
    leave: (node) => '$' + node.name,
  },
  // Document
  Document: {
    leave: (node) => join$1(node.definitions, '\n\n'),
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap$1('(', join$1(node.variableDefinitions, ', '), ')');
      const prefix = join$1(
        [
          node.operation,
          join$1([node.name, varDefs]),
          join$1(node.directives, ' '),
        ],
        ' ',
      ); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) =>
      variable +
      ': ' +
      type +
      wrap$1(' = ', defaultValue) +
      wrap$1(' ', join$1(directives, ' ')),
  },
  SelectionSet: {
    leave: ({ selections }) => block$1(selections),
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap$1('', alias, ': ') + name;
      let argsLine = prefix + wrap$1('(', join$1(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH$1) {
        argsLine = prefix + wrap$1('(\n', indent$1(join$1(args, '\n')), '\n)');
      }

      return join$1([argsLine, join$1(directives, ' '), selectionSet], ' ');
    },
  },
  Argument: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) =>
      '...' + name + wrap$1(' ', join$1(directives, ' ')),
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) =>
      join$1(
        [
          '...',
          wrap$1('on ', typeCondition),
          join$1(directives, ' '),
          selectionSet,
        ],
        ' ',
      ),
  },
  FragmentDefinition: {
    leave: (
      { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
    ) =>
      // or removed in the future.
      `fragment ${name}${wrap$1('(', join$1(variableDefinitions, ', '), ')')} ` +
      `on ${typeCondition} ${wrap$1('', join$1(directives, ' '), ' ')}` +
      selectionSet,
  },
  // Value
  IntValue: {
    leave: ({ value }) => value,
  },
  FloatValue: {
    leave: ({ value }) => value,
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) =>
      isBlockString ? printBlockString$1(value) : printString(value),
  },
  BooleanValue: {
    leave: ({ value }) => (value ? 'true' : 'false'),
  },
  NullValue: {
    leave: () => 'null',
  },
  EnumValue: {
    leave: ({ value }) => value,
  },
  ListValue: {
    leave: ({ values }) => '[' + join$1(values, ', ') + ']',
  },
  ObjectValue: {
    leave: ({ fields }) => '{' + join$1(fields, ', ') + '}',
  },
  ObjectField: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) =>
      '@' + name + wrap$1('(', join$1(args, ', '), ')'),
  },
  // Type
  NamedType: {
    leave: ({ name }) => name,
  },
  ListType: {
    leave: ({ type }) => '[' + type + ']',
  },
  NonNullType: {
    leave: ({ type }) => type + '!',
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) =>
      wrap$1('', description, '\n') +
      join$1(['schema', join$1(directives, ' '), block$1(operationTypes)], ' '),
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ': ' + type,
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) =>
      wrap$1('', description, '\n') +
      join$1(['scalar', name, join$1(directives, ' ')], ' '),
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap$1('', description, '\n') +
      join$1(
        [
          'type',
          name,
          wrap$1('implements ', join$1(interfaces, ' & ')),
          join$1(directives, ' '),
          block$1(fields),
        ],
        ' ',
      ),
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) =>
      wrap$1('', description, '\n') +
      name +
      (hasMultilineItems$1(args)
        ? wrap$1('(\n', indent$1(join$1(args, '\n')), '\n)')
        : wrap$1('(', join$1(args, ', '), ')')) +
      ': ' +
      type +
      wrap$1(' ', join$1(directives, ' ')),
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) =>
      wrap$1('', description, '\n') +
      join$1(
        [name + ': ' + type, wrap$1('= ', defaultValue), join$1(directives, ' ')],
        ' ',
      ),
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap$1('', description, '\n') +
      join$1(
        [
          'interface',
          name,
          wrap$1('implements ', join$1(interfaces, ' & ')),
          join$1(directives, ' '),
          block$1(fields),
        ],
        ' ',
      ),
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) =>
      wrap$1('', description, '\n') +
      join$1(
        ['union', name, join$1(directives, ' '), wrap$1('= ', join$1(types, ' | '))],
        ' ',
      ),
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) =>
      wrap$1('', description, '\n') +
      join$1(['enum', name, join$1(directives, ' '), block$1(values)], ' '),
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) =>
      wrap$1('', description, '\n') + join$1([name, join$1(directives, ' ')], ' '),
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) =>
      wrap$1('', description, '\n') +
      join$1(['input', name, join$1(directives, ' '), block$1(fields)], ' '),
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) =>
      wrap$1('', description, '\n') +
      'directive @' +
      name +
      (hasMultilineItems$1(args)
        ? wrap$1('(\n', indent$1(join$1(args, '\n')), '\n)')
        : wrap$1('(', join$1(args, ', '), ')')) +
      (repeatable ? ' repeatable' : '') +
      ' on ' +
      join$1(locations, ' | '),
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) =>
      join$1(
        ['extend schema', join$1(directives, ' '), block$1(operationTypes)],
        ' ',
      ),
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) =>
      join$1(['extend scalar', name, join$1(directives, ' ')], ' '),
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join$1(
        [
          'extend type',
          name,
          wrap$1('implements ', join$1(interfaces, ' & ')),
          join$1(directives, ' '),
          block$1(fields),
        ],
        ' ',
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join$1(
        [
          'extend interface',
          name,
          wrap$1('implements ', join$1(interfaces, ' & ')),
          join$1(directives, ' '),
          block$1(fields),
        ],
        ' ',
      ),
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) =>
      join$1(
        [
          'extend union',
          name,
          join$1(directives, ' '),
          wrap$1('= ', join$1(types, ' | ')),
        ],
        ' ',
      ),
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) =>
      join$1(['extend enum', name, join$1(directives, ' '), block$1(values)], ' '),
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) =>
      join$1(['extend input', name, join$1(directives, ' '), block$1(fields)], ' '),
  },
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join$1(maybeArray, separator = '') {
  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.filter((x) => x).join(separator)) !== null &&
    _maybeArray$filter$jo !== void 0
    ? _maybeArray$filter$jo
    : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */

function block$1(array) {
  return wrap$1('{\n', indent$1(join$1(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */

function wrap$1(start, maybeString, end = '') {
  return maybeString != null && maybeString !== ''
    ? start + maybeString + end
    : '';
}

function indent$1(str) {
  return wrap$1('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems$1(maybeArray) {
  var _maybeArray$some;

  // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */
  return (_maybeArray$some =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.some((str) => str.includes('\n'))) !== null &&
    _maybeArray$some !== void 0
    ? _maybeArray$some
    : false;
}

var printer = /*#__PURE__*/Object.freeze({
	__proto__: null,
	print: print
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(printer);

var createRequestBody$1 = {};

var _public = {};

var ReactNativeFile$1 = function ReactNativeFile(_ref) {
  var uri = _ref.uri,
    name = _ref.name,
    type = _ref.type;
  this.uri = uri;
  this.name = name;
  this.type = type;
};

var ReactNativeFile = ReactNativeFile$1;

var isExtractableFile = function isExtractableFile(value) {
  return (
    (typeof File !== 'undefined' && value instanceof File) ||
    (typeof Blob !== 'undefined' && value instanceof Blob) ||
    value instanceof ReactNativeFile
  );
};

var defaultIsExtractableFile = isExtractableFile;

var extractFiles = function extractFiles(value, path, isExtractableFile) {
  if (path === void 0) {
    path = '';
  }

  if (isExtractableFile === void 0) {
    isExtractableFile = defaultIsExtractableFile;
  }

  var clone;
  var files = new Map();

  function addFile(paths, file) {
    var storedPaths = files.get(file);
    if (storedPaths) storedPaths.push.apply(storedPaths, paths);
    else files.set(file, paths);
  }

  if (isExtractableFile(value)) {
    clone = null;
    addFile([path], value);
  } else {
    var prefix = path ? path + '.' : '';
    if (typeof FileList !== 'undefined' && value instanceof FileList)
      clone = Array.prototype.map.call(value, function (file, i) {
        addFile(['' + prefix + i], file);
        return null;
      });
    else if (Array.isArray(value))
      clone = value.map(function (child, i) {
        var result = extractFiles(child, '' + prefix + i, isExtractableFile);
        result.files.forEach(addFile);
        return result.clone;
      });
    else if (value && value.constructor === Object) {
      clone = {};

      for (var i in value) {
        var result = extractFiles(value[i], '' + prefix + i, isExtractableFile);
        result.files.forEach(addFile);
        clone[i] = result.clone;
      }
    } else clone = value;
  }

  return {
    clone: clone,
    files: files,
  };
};

_public.ReactNativeFile = ReactNativeFile$1;
_public.extractFiles = extractFiles;
_public.isExtractableFile = isExtractableFile;

/* eslint-env browser */

var browser = typeof self == 'object' ? self.FormData : window.FormData;

var defaultJsonSerializer = {};

Object.defineProperty(defaultJsonSerializer, "__esModule", { value: true });
defaultJsonSerializer.defaultJsonSerializer = void 0;
defaultJsonSerializer.defaultJsonSerializer = {
    parse: JSON.parse,
    stringify: JSON.stringify,
};

var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(createRequestBody$1, "__esModule", { value: true });
var extract_files_1 = _public;
var form_data_1 = __importDefault(browser);
var defaultJsonSerializer_1 = defaultJsonSerializer;
/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
var isExtractableFileEnhanced = function (value) {
    return extract_files_1.isExtractableFile(value) ||
        (value !== null && typeof value === 'object' && typeof value.pipe === 'function');
};
/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
function createRequestBody(query, variables, operationName, jsonSerializer) {
    if (jsonSerializer === void 0) { jsonSerializer = defaultJsonSerializer_1.defaultJsonSerializer; }
    var _a = extract_files_1.extractFiles({ query: query, variables: variables, operationName: operationName }, '', isExtractableFileEnhanced), clone = _a.clone, files = _a.files;
    if (files.size === 0) {
        if (!Array.isArray(query)) {
            return jsonSerializer.stringify(clone);
        }
        if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
            throw new Error('Cannot create request body with given variable type, array expected');
        }
        // Batch support
        var payload = query.reduce(function (accu, currentQuery, index) {
            accu.push({ query: currentQuery, variables: variables ? variables[index] : undefined });
            return accu;
        }, []);
        return jsonSerializer.stringify(payload);
    }
    var Form = typeof FormData === 'undefined' ? form_data_1.default : FormData;
    var form = new Form();
    form.append('operations', jsonSerializer.stringify(clone));
    var map = {};
    var i = 0;
    files.forEach(function (paths) {
        map[++i] = paths;
    });
    form.append('map', jsonSerializer.stringify(map));
    i = 0;
    files.forEach(function (paths, file) {
        form.append("" + ++i, file);
    });
    return form;
}
createRequestBody$1.default = createRequestBody;

var parseArgs = {};

Object.defineProperty(parseArgs, "__esModule", { value: true });
parseArgs.parseBatchRequestsExtendedArgs = parseArgs.parseRawRequestExtendedArgs = parseArgs.parseRequestExtendedArgs = parseArgs.parseBatchRequestArgs = parseArgs.parseRawRequestArgs = parseArgs.parseRequestArgs = void 0;
function parseRequestArgs(documentOrOptions, variables, requestHeaders) {
    return documentOrOptions.document
        ? documentOrOptions
        : {
            document: documentOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseRequestArgs = parseRequestArgs;
function parseRawRequestArgs(queryOrOptions, variables, requestHeaders) {
    return queryOrOptions.query
        ? queryOrOptions
        : {
            query: queryOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseRawRequestArgs = parseRawRequestArgs;
function parseBatchRequestArgs(documentsOrOptions, requestHeaders) {
    return documentsOrOptions.documents
        ? documentsOrOptions
        : {
            documents: documentsOrOptions,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseBatchRequestArgs = parseBatchRequestArgs;
function parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders) {
    return urlOrOptions.document
        ? urlOrOptions
        : {
            url: urlOrOptions,
            document: document,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseRequestExtendedArgs = parseRequestExtendedArgs;
function parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders) {
    return urlOrOptions.query
        ? urlOrOptions
        : {
            url: urlOrOptions,
            query: query,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseRawRequestExtendedArgs = parseRawRequestExtendedArgs;
function parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders) {
    return urlOrOptions.documents
        ? urlOrOptions
        : {
            url: urlOrOptions,
            documents: documents,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
parseArgs.parseBatchRequestsExtendedArgs = parseBatchRequestsExtendedArgs;

var types = {};

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(types, "__esModule", { value: true });
types.ClientError = void 0;
var ClientError = /** @class */ (function (_super) {
    __extends$1(ClientError, _super);
    function ClientError(response, request) {
        var _this = this;
        var message = ClientError.extractMessage(response) + ": " + JSON.stringify({
            response: response,
            request: request,
        });
        _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ClientError.prototype);
        _this.response = response;
        _this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, ClientError);
        }
        return _this;
    }
    ClientError.extractMessage = function (response) {
        try {
            return response.errors[0].message;
        }
        catch (e) {
            return "GraphQL Error (Code: " + response.status + ")";
        }
    };
    return ClientError;
}(Error));
types.ClientError = ClientError;

var graphqlWs = {};

var hasRequiredGraphqlWs;

function requireGraphqlWs () {
	if (hasRequiredGraphqlWs) return graphqlWs;
	hasRequiredGraphqlWs = 1;
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(graphqlWs, "__esModule", { value: true });
	graphqlWs.GraphQLWebSocketClient = void 0;
	var types_1 = types;
	var _1 = requireDist();
	var CONNECTION_INIT = 'connection_init';
	var CONNECTION_ACK = 'connection_ack';
	var PING = 'ping';
	var PONG = 'pong';
	var SUBSCRIBE = 'subscribe';
	var NEXT = 'next';
	var ERROR = 'error';
	var COMPLETE = 'complete';
	var GraphQLWebSocketMessage = /** @class */ (function () {
	    function GraphQLWebSocketMessage(type, payload, id) {
	        this._type = type;
	        this._payload = payload;
	        this._id = id;
	    }
	    Object.defineProperty(GraphQLWebSocketMessage.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(GraphQLWebSocketMessage.prototype, "id", {
	        get: function () {
	            return this._id;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(GraphQLWebSocketMessage.prototype, "payload", {
	        get: function () {
	            return this._payload;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(GraphQLWebSocketMessage.prototype, "text", {
	        get: function () {
	            var result = { type: this.type };
	            if (this.id != null && this.id != undefined)
	                result.id = this.id;
	            if (this.payload != null && this.payload != undefined)
	                result.payload = this.payload;
	            return JSON.stringify(result);
	        },
	        enumerable: false,
	        configurable: true
	    });
	    GraphQLWebSocketMessage.parse = function (data, f) {
	        var _a = JSON.parse(data), type = _a.type, payload = _a.payload, id = _a.id;
	        return new GraphQLWebSocketMessage(type, f(payload), id);
	    };
	    return GraphQLWebSocketMessage;
	}());
	var GraphQLWebSocketClient = /** @class */ (function () {
	    function GraphQLWebSocketClient(socket, _a) {
	        var _this = this;
	        var onInit = _a.onInit, onAcknowledged = _a.onAcknowledged, onPing = _a.onPing, onPong = _a.onPong;
	        this.socketState = { acknowledged: false, lastRequestId: 0, subscriptions: {} };
	        this.socket = socket;
	        socket.onopen = function (e) { return __awaiter(_this, void 0, void 0, function () {
	            var _a, _b, _c, _d;
	            return __generator(this, function (_e) {
	                switch (_e.label) {
	                    case 0:
	                        this.socketState.acknowledged = false;
	                        this.socketState.subscriptions = {};
	                        _b = (_a = socket).send;
	                        _c = ConnectionInit;
	                        if (!onInit) return [3 /*break*/, 2];
	                        return [4 /*yield*/, onInit()];
	                    case 1:
	                        _d = _e.sent();
	                        return [3 /*break*/, 3];
	                    case 2:
	                        _d = null;
	                        _e.label = 3;
	                    case 3:
	                        _b.apply(_a, [_c.apply(void 0, [_d]).text]);
	                        return [2 /*return*/];
	                }
	            });
	        }); };
	        socket.onclose = function (e) {
	            _this.socketState.acknowledged = false;
	            _this.socketState.subscriptions = {};
	        };
	        socket.onerror = function (e) {
	            console.error(e);
	        };
	        socket.onmessage = function (e) {
	            try {
	                var message = parseMessage(e.data);
	                switch (message.type) {
	                    case CONNECTION_ACK: {
	                        if (_this.socketState.acknowledged) {
	                            console.warn('Duplicate CONNECTION_ACK message ignored');
	                        }
	                        else {
	                            _this.socketState.acknowledged = true;
	                            if (onAcknowledged)
	                                onAcknowledged(message.payload);
	                        }
	                        return;
	                    }
	                    case PING: {
	                        if (onPing)
	                            onPing(message.payload).then(function (r) { return socket.send(Pong(r).text); });
	                        else
	                            socket.send(Pong(null).text);
	                        return;
	                    }
	                    case PONG: {
	                        if (onPong)
	                            onPong(message.payload);
	                        return;
	                    }
	                }
	                if (!_this.socketState.acknowledged) {
	                    // Web-socket connection not acknowledged
	                    return;
	                }
	                if (message.id === undefined || message.id === null || !_this.socketState.subscriptions[message.id]) {
	                    // No subscription identifer or subscription indentifier is not found
	                    return;
	                }
	                var _a = _this.socketState.subscriptions[message.id], query = _a.query, variables = _a.variables, subscriber = _a.subscriber;
	                switch (message.type) {
	                    case NEXT: {
	                        if (!message.payload.errors && message.payload.data) {
	                            subscriber.next && subscriber.next(message.payload.data);
	                        }
	                        if (message.payload.errors) {
	                            subscriber.error &&
	                                subscriber.error(new types_1.ClientError(__assign(__assign({}, message.payload), { status: 200 }), { query: query, variables: variables }));
	                        }
	                        else {
	                        }
	                        return;
	                    }
	                    case ERROR: {
	                        subscriber.error &&
	                            subscriber.error(new types_1.ClientError({ errors: message.payload, status: 200 }, { query: query, variables: variables }));
	                        return;
	                    }
	                    case COMPLETE: {
	                        subscriber.complete && subscriber.complete();
	                        delete _this.socketState.subscriptions[message.id];
	                        return;
	                    }
	                }
	            }
	            catch (e) {
	                // Unexpected errors while handling graphql-ws message
	                console.error(e);
	                socket.close(1006);
	            }
	            socket.close(4400, 'Unknown graphql-ws message.');
	        };
	    }
	    GraphQLWebSocketClient.prototype.makeSubscribe = function (query, operationName, variables, subscriber) {
	        var _this = this;
	        var subscriptionId = (this.socketState.lastRequestId++).toString();
	        this.socketState.subscriptions[subscriptionId] = { query: query, variables: variables, subscriber: subscriber };
	        this.socket.send(Subscribe(subscriptionId, { query: query, operationName: operationName, variables: variables }).text);
	        return function () {
	            _this.socket.send(Complete(subscriptionId).text);
	            delete _this.socketState.subscriptions[subscriptionId];
	        };
	    };
	    GraphQLWebSocketClient.prototype.rawRequest = function (query, variables) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var result;
	            _this.rawSubscribe(query, {
	                next: function (data, extensions) { return (result = { data: data, extensions: extensions }); },
	                error: reject,
	                complete: function () { return resolve(result); },
	            }, variables);
	        });
	    };
	    GraphQLWebSocketClient.prototype.request = function (document, variables) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var result;
	            _this.subscribe(document, {
	                next: function (data) { return (result = data); },
	                error: reject,
	                complete: function () { return resolve(result); },
	            }, variables);
	        });
	    };
	    GraphQLWebSocketClient.prototype.subscribe = function (document, subscriber, variables) {
	        var _a = _1.resolveRequestDocument(document), query = _a.query, operationName = _a.operationName;
	        return this.makeSubscribe(query, operationName, variables, subscriber);
	    };
	    GraphQLWebSocketClient.prototype.rawSubscribe = function (query, subscriber, variables) {
	        return this.makeSubscribe(query, undefined, variables, subscriber);
	    };
	    GraphQLWebSocketClient.prototype.ping = function (payload) {
	        this.socket.send(Ping(payload).text);
	    };
	    GraphQLWebSocketClient.prototype.close = function () {
	        this.socket.close(1000);
	    };
	    GraphQLWebSocketClient.PROTOCOL = 'graphql-transport-ws';
	    return GraphQLWebSocketClient;
	}());
	graphqlWs.GraphQLWebSocketClient = GraphQLWebSocketClient;
	// Helper functions
	function parseMessage(data, f) {
	    if (f === void 0) { f = function (a) { return a; }; }
	    var m = GraphQLWebSocketMessage.parse(data, f);
	    return m;
	}
	function ConnectionInit(payload) {
	    return new GraphQLWebSocketMessage(CONNECTION_INIT, payload);
	}
	function Ping(payload) {
	    return new GraphQLWebSocketMessage(PING, payload, undefined);
	}
	function Pong(payload) {
	    return new GraphQLWebSocketMessage(PONG, payload, undefined);
	}
	function Subscribe(id, payload) {
	    return new GraphQLWebSocketMessage(SUBSCRIBE, payload, id);
	}
	function Complete(id) {
	    return new GraphQLWebSocketMessage(COMPLETE, undefined, id);
	}
	
	return graphqlWs;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
		    __assign = Object.assign || function(t) {
		        for (var s, i = 1, n = arguments.length; i < n; i++) {
		            s = arguments[i];
		            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
		                t[p] = s[p];
		        }
		        return t;
		    };
		    return __assign.apply(this, arguments);
		};
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
		    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
		    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
		    function verb(n) { return function (v) { return step([n, v]); }; }
		    function step(op) {
		        if (f) throw new TypeError("Generator is already executing.");
		        while (_) try {
		            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
		            if (y = 0, t) op = [op[0] & 2, t.value];
		            switch (op[0]) {
		                case 0: case 1: t = op; break;
		                case 4: _.label++; return { value: op[1], done: false };
		                case 5: _.label++; y = op[1]; op = [0]; continue;
		                case 7: op = _.ops.pop(); _.trys.pop(); continue;
		                default:
		                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
		                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
		                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
		                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
		                    if (t[2]) _.ops.pop();
		                    _.trys.pop(); continue;
		            }
		            op = body.call(thisArg, _);
		        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
		        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
		    }
		};
		var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
		    var t = {};
		    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
		        t[p] = s[p];
		    if (s != null && typeof Object.getOwnPropertySymbols === "function")
		        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
		            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
		                t[p[i]] = s[p[i]];
		        }
		    return t;
		};
		var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.GraphQLWebSocketClient = exports.gql = exports.resolveRequestDocument = exports.batchRequests = exports.request = exports.rawRequest = exports.GraphQLClient = exports.ClientError = void 0;
		var cross_fetch_1 = __importStar(browserPonyfill.exports), CrossFetch = cross_fetch_1;
		var parser_1 = require$$1;
		var printer_1 = require$$2;
		var createRequestBody_1 = __importDefault(createRequestBody$1);
		var defaultJsonSerializer_1 = defaultJsonSerializer;
		var parseArgs_1 = parseArgs;
		var types_1 = types;
		Object.defineProperty(exports, "ClientError", { enumerable: true, get: function () { return types_1.ClientError; } });
		/**
		 * Convert the given headers configuration into a plain object.
		 */
		var resolveHeaders = function (headers) {
		    var oHeaders = {};
		    if (headers) {
		        if ((typeof Headers !== 'undefined' && headers instanceof Headers) ||
		            (CrossFetch && CrossFetch.Headers && headers instanceof CrossFetch.Headers)) {
		            oHeaders = HeadersInstanceToPlainObject(headers);
		        }
		        else if (Array.isArray(headers)) {
		            headers.forEach(function (_a) {
		                var name = _a[0], value = _a[1];
		                oHeaders[name] = value;
		            });
		        }
		        else {
		            oHeaders = headers;
		        }
		    }
		    return oHeaders;
		};
		/**
		 * Clean a GraphQL document to send it via a GET query
		 *
		 * @param {string} str GraphQL query
		 * @returns {string} Cleaned query
		 */
		var queryCleanner = function (str) { return str.replace(/([\s,]|#[^\n\r]+)+/g, ' ').trim(); };
		/**
		 * Create query string for GraphQL request
		 *
		 * @param {object} param0 -
		 *
		 * @param {string|string[]} param0.query the GraphQL document or array of document if it's a batch request
		 * @param {string|undefined} param0.operationName the GraphQL operation name
		 * @param {any|any[]} param0.variables the GraphQL variables to use
		 */
		var buildGetQueryParams = function (_a) {
		    var query = _a.query, variables = _a.variables, operationName = _a.operationName, jsonSerializer = _a.jsonSerializer;
		    if (!Array.isArray(query)) {
		        var search = ["query=" + encodeURIComponent(queryCleanner(query))];
		        if (variables) {
		            search.push("variables=" + encodeURIComponent(jsonSerializer.stringify(variables)));
		        }
		        if (operationName) {
		            search.push("operationName=" + encodeURIComponent(operationName));
		        }
		        return search.join('&');
		    }
		    if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
		        throw new Error('Cannot create query with given variable type, array expected');
		    }
		    // Batch support
		    var payload = query.reduce(function (accu, currentQuery, index) {
		        accu.push({
		            query: queryCleanner(currentQuery),
		            variables: variables ? jsonSerializer.stringify(variables[index]) : undefined,
		        });
		        return accu;
		    }, []);
		    return "query=" + encodeURIComponent(jsonSerializer.stringify(payload));
		};
		/**
		 * Fetch data using POST method
		 */
		var post = function (_a) {
		    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions, middleware = _a.middleware;
		    return __awaiter(void 0, void 0, void 0, function () {
		        var body, options;
		        return __generator(this, function (_b) {
		            switch (_b.label) {
		                case 0:
		                    body = createRequestBody_1.default(query, variables, operationName, fetchOptions.jsonSerializer);
		                    options = __assign({ method: 'POST', headers: __assign(__assign({}, (typeof body === 'string' ? { 'Content-Type': 'application/json' } : {})), headers), body: body }, fetchOptions);
		                    if (!middleware) return [3 /*break*/, 2];
		                    return [4 /*yield*/, Promise.resolve(middleware(options))];
		                case 1:
		                    options = _b.sent();
		                    _b.label = 2;
		                case 2: return [4 /*yield*/, fetch(url, options)];
		                case 3: return [2 /*return*/, _b.sent()];
		            }
		        });
		    });
		};
		/**
		 * Fetch data using GET method
		 */
		var get = function (_a) {
		    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions, middleware = _a.middleware;
		    return __awaiter(void 0, void 0, void 0, function () {
		        var queryParams, options;
		        return __generator(this, function (_b) {
		            switch (_b.label) {
		                case 0:
		                    queryParams = buildGetQueryParams({
		                        query: query,
		                        variables: variables,
		                        operationName: operationName,
		                        jsonSerializer: fetchOptions.jsonSerializer,
		                    });
		                    options = __assign({ method: 'GET', headers: headers }, fetchOptions);
		                    if (!middleware) return [3 /*break*/, 2];
		                    return [4 /*yield*/, Promise.resolve(middleware(options))];
		                case 1:
		                    options = _b.sent();
		                    _b.label = 2;
		                case 2: return [4 /*yield*/, fetch(url + "?" + queryParams, options)];
		                case 3: return [2 /*return*/, _b.sent()];
		            }
		        });
		    });
		};
		/**
		 * GraphQL Client.
		 */
		var GraphQLClient = /** @class */ (function () {
		    function GraphQLClient(url, options) {
		        if (options === void 0) { options = {}; }
		        this.url = url;
		        this.options = options;
		    }
		    GraphQLClient.prototype.rawRequest = function (queryOrOptions, variables, requestHeaders) {
		        return __awaiter(this, void 0, void 0, function () {
		            var rawRequestOptions, _a, headers, _b, fetch, _c, method, requestMiddleware, responseMiddleware, fetchOptions, url, operationName;
		            return __generator(this, function (_d) {
		                rawRequestOptions = parseArgs_1.parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
		                _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, requestMiddleware = _a.requestMiddleware, responseMiddleware = _a.responseMiddleware, fetchOptions = __rest(_a, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]);
		                url = this.url;
		                if (rawRequestOptions.signal !== undefined) {
		                    fetchOptions.signal = rawRequestOptions.signal;
		                }
		                operationName = resolveRequestDocument(rawRequestOptions.query).operationName;
		                return [2 /*return*/, makeRequest({
		                        url: url,
		                        query: rawRequestOptions.query,
		                        variables: rawRequestOptions.variables,
		                        headers: __assign(__assign({}, resolveHeaders(callOrIdentity(headers))), resolveHeaders(rawRequestOptions.requestHeaders)),
		                        operationName: operationName,
		                        fetch: fetch,
		                        method: method,
		                        fetchOptions: fetchOptions,
		                        middleware: requestMiddleware,
		                    })
		                        .then(function (response) {
		                        if (responseMiddleware) {
		                            responseMiddleware(response);
		                        }
		                        return response;
		                    })
		                        .catch(function (error) {
		                        if (responseMiddleware) {
		                            responseMiddleware(error);
		                        }
		                        throw error;
		                    })];
		            });
		        });
		    };
		    GraphQLClient.prototype.request = function (documentOrOptions) {
		        var variablesAndRequestHeaders = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            variablesAndRequestHeaders[_i - 1] = arguments[_i];
		        }
		        var variables = variablesAndRequestHeaders[0], requestHeaders = variablesAndRequestHeaders[1];
		        var requestOptions = parseArgs_1.parseRequestArgs(documentOrOptions, variables, requestHeaders);
		        var _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, requestMiddleware = _a.requestMiddleware, responseMiddleware = _a.responseMiddleware, fetchOptions = __rest(_a, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]);
		        var url = this.url;
		        if (requestOptions.signal !== undefined) {
		            fetchOptions.signal = requestOptions.signal;
		        }
		        var _d = resolveRequestDocument(requestOptions.document), query = _d.query, operationName = _d.operationName;
		        return makeRequest({
		            url: url,
		            query: query,
		            variables: requestOptions.variables,
		            headers: __assign(__assign({}, resolveHeaders(callOrIdentity(headers))), resolveHeaders(requestOptions.requestHeaders)),
		            operationName: operationName,
		            fetch: fetch,
		            method: method,
		            fetchOptions: fetchOptions,
		            middleware: requestMiddleware,
		        })
		            .then(function (response) {
		            if (responseMiddleware) {
		                responseMiddleware(response);
		            }
		            return response.data;
		        })
		            .catch(function (error) {
		            if (responseMiddleware) {
		                responseMiddleware(error);
		            }
		            throw error;
		        });
		    };
		    GraphQLClient.prototype.batchRequests = function (documentsOrOptions, requestHeaders) {
		        var batchRequestOptions = parseArgs_1.parseBatchRequestArgs(documentsOrOptions, requestHeaders);
		        var _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, requestMiddleware = _a.requestMiddleware, responseMiddleware = _a.responseMiddleware, fetchOptions = __rest(_a, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]);
		        var url = this.url;
		        if (batchRequestOptions.signal !== undefined) {
		            fetchOptions.signal = batchRequestOptions.signal;
		        }
		        var queries = batchRequestOptions.documents.map(function (_a) {
		            var document = _a.document;
		            return resolveRequestDocument(document).query;
		        });
		        var variables = batchRequestOptions.documents.map(function (_a) {
		            var variables = _a.variables;
		            return variables;
		        });
		        return makeRequest({
		            url: url,
		            query: queries,
		            variables: variables,
		            headers: __assign(__assign({}, resolveHeaders(callOrIdentity(headers))), resolveHeaders(batchRequestOptions.requestHeaders)),
		            operationName: undefined,
		            fetch: fetch,
		            method: method,
		            fetchOptions: fetchOptions,
		            middleware: requestMiddleware,
		        })
		            .then(function (response) {
		            if (responseMiddleware) {
		                responseMiddleware(response);
		            }
		            return response.data;
		        })
		            .catch(function (error) {
		            if (responseMiddleware) {
		                responseMiddleware(error);
		            }
		            throw error;
		        });
		    };
		    GraphQLClient.prototype.setHeaders = function (headers) {
		        this.options.headers = headers;
		        return this;
		    };
		    /**
		     * Attach a header to the client. All subsequent requests will have this header.
		     */
		    GraphQLClient.prototype.setHeader = function (key, value) {
		        var _a;
		        var headers = this.options.headers;
		        if (headers) {
		            // todo what if headers is in nested array form... ?
		            //@ts-ignore
		            headers[key] = value;
		        }
		        else {
		            this.options.headers = (_a = {}, _a[key] = value, _a);
		        }
		        return this;
		    };
		    /**
		     * Change the client endpoint. All subsequent requests will send to this endpoint.
		     */
		    GraphQLClient.prototype.setEndpoint = function (value) {
		        this.url = value;
		        return this;
		    };
		    return GraphQLClient;
		}());
		exports.GraphQLClient = GraphQLClient;
		function makeRequest(_a) {
		    var url = _a.url, query = _a.query, variables = _a.variables, headers = _a.headers, operationName = _a.operationName, fetch = _a.fetch, _b = _a.method, method = _b === void 0 ? 'POST' : _b, fetchOptions = _a.fetchOptions, middleware = _a.middleware;
		    return __awaiter(this, void 0, void 0, function () {
		        var fetcher, isBathchingQuery, response, result, successfullyReceivedData, successfullyPassedErrorPolicy, headers_1, status_1, rest, data, errorResult;
		        return __generator(this, function (_c) {
		            switch (_c.label) {
		                case 0:
		                    fetcher = method.toUpperCase() === 'POST' ? post : get;
		                    isBathchingQuery = Array.isArray(query);
		                    return [4 /*yield*/, fetcher({
		                            url: url,
		                            query: query,
		                            variables: variables,
		                            operationName: operationName,
		                            headers: headers,
		                            fetch: fetch,
		                            fetchOptions: fetchOptions,
		                            middleware: middleware,
		                        })];
		                case 1:
		                    response = _c.sent();
		                    return [4 /*yield*/, getResult(response, fetchOptions.jsonSerializer)];
		                case 2:
		                    result = _c.sent();
		                    successfullyReceivedData = isBathchingQuery && Array.isArray(result) ? !result.some(function (_a) {
		                        var data = _a.data;
		                        return !data;
		                    }) : !!result.data;
		                    successfullyPassedErrorPolicy = !result.errors || fetchOptions.errorPolicy === 'all' || fetchOptions.errorPolicy === 'ignore';
		                    if (response.ok && successfullyPassedErrorPolicy && successfullyReceivedData) {
		                        headers_1 = response.headers, status_1 = response.status;
		                        result.errors, rest = __rest(result, ["errors"]);
		                        data = fetchOptions.errorPolicy === 'ignore' ? rest : result;
		                        return [2 /*return*/, __assign(__assign({}, (isBathchingQuery ? { data: data } : data)), { headers: headers_1, status: status_1 })];
		                    }
		                    else {
		                        errorResult = typeof result === 'string' ? { error: result } : result;
		                        throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status, headers: response.headers }), { query: query, variables: variables });
		                    }
		            }
		        });
		    });
		}
		function rawRequest(urlOrOptions, query, variables, requestHeaders) {
		    return __awaiter(this, void 0, void 0, function () {
		        var requestOptions, client;
		        return __generator(this, function (_a) {
		            requestOptions = parseArgs_1.parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders);
		            client = new GraphQLClient(requestOptions.url);
		            return [2 /*return*/, client.rawRequest(__assign({}, requestOptions))];
		        });
		    });
		}
		exports.rawRequest = rawRequest;
		function request(urlOrOptions, document) {
		    var variablesAndRequestHeaders = [];
		    for (var _i = 2; _i < arguments.length; _i++) {
		        variablesAndRequestHeaders[_i - 2] = arguments[_i];
		    }
		    return __awaiter(this, void 0, void 0, function () {
		        var variables, requestHeaders, requestOptions, client;
		        return __generator(this, function (_a) {
		            variables = variablesAndRequestHeaders[0], requestHeaders = variablesAndRequestHeaders[1];
		            requestOptions = parseArgs_1.parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders);
		            client = new GraphQLClient(requestOptions.url);
		            return [2 /*return*/, client.request(__assign({}, requestOptions))];
		        });
		    });
		}
		exports.request = request;
		function batchRequests(urlOrOptions, documents, requestHeaders) {
		    return __awaiter(this, void 0, void 0, function () {
		        var requestOptions, client;
		        return __generator(this, function (_a) {
		            requestOptions = parseArgs_1.parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders);
		            client = new GraphQLClient(requestOptions.url);
		            return [2 /*return*/, client.batchRequests(__assign({}, requestOptions))];
		        });
		    });
		}
		exports.batchRequests = batchRequests;
		exports.default = request;
		/**
		 * todo
		 */
		function getResult(response, jsonSerializer) {
		    if (jsonSerializer === void 0) { jsonSerializer = defaultJsonSerializer_1.defaultJsonSerializer; }
		    return __awaiter(this, void 0, void 0, function () {
		        var contentType, _a, _b;
		        return __generator(this, function (_c) {
		            switch (_c.label) {
		                case 0:
		                    response.headers.forEach(function (value, key) {
		                        if (key.toLowerCase() === 'content-type') {
		                            contentType = value;
		                        }
		                    });
		                    if (!(contentType && contentType.toLowerCase().startsWith('application/json'))) return [3 /*break*/, 2];
		                    _b = (_a = jsonSerializer).parse;
		                    return [4 /*yield*/, response.text()];
		                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
		                case 2: return [2 /*return*/, response.text()];
		            }
		        });
		    });
		}
		/**
		 * helpers
		 */
		function extractOperationName(document) {
		    var _a;
		    var operationName = undefined;
		    var operationDefinitions = document.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; });
		    if (operationDefinitions.length === 1) {
		        operationName = (_a = operationDefinitions[0].name) === null || _a === void 0 ? void 0 : _a.value;
		    }
		    return operationName;
		}
		function resolveRequestDocument(document) {
		    if (typeof document === 'string') {
		        var operationName_1 = undefined;
		        try {
		            var parsedDocument = parser_1.parse(document);
		            operationName_1 = extractOperationName(parsedDocument);
		        }
		        catch (err) {
		            // Failed parsing the document, the operationName will be undefined
		        }
		        return { query: document, operationName: operationName_1 };
		    }
		    var operationName = extractOperationName(document);
		    return { query: printer_1.print(document), operationName: operationName };
		}
		exports.resolveRequestDocument = resolveRequestDocument;
		function callOrIdentity(value) {
		    return typeof value === 'function' ? value() : value;
		}
		/**
		 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
		 *
		 * @example
		 *
		 * import { gql } from 'graphql-request'
		 *
		 * await request('https://foo.bar/graphql', gql`...`)
		 *
		 * @remarks
		 *
		 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
		 */
		function gql(chunks) {
		    var variables = [];
		    for (var _i = 1; _i < arguments.length; _i++) {
		        variables[_i - 1] = arguments[_i];
		    }
		    return chunks.reduce(function (accumulator, chunk, index) { return "" + accumulator + chunk + (index in variables ? variables[index] : ''); }, '');
		}
		exports.gql = gql;
		/**
		 * Convert Headers instance into regular object
		 */
		function HeadersInstanceToPlainObject(headers) {
		    var o = {};
		    headers.forEach(function (v, k) {
		        o[k] = v;
		    });
		    return o;
		}
		var graphql_ws_1 = requireGraphqlWs();
		Object.defineProperty(exports, "GraphQLWebSocketClient", { enumerable: true, get: function () { return graphql_ws_1.GraphQLWebSocketClient; } });
		
} (dist));
	return dist;
}

var distExports = requireDist();

/**
 * This enum is used only internally in order to create nominal type for the disabled plugin
 */
var EnableIfBranded;
(function (EnableIfBranded) {
    EnableIfBranded[EnableIfBranded["DisabledPlugin"] = 0] = "DisabledPlugin";
})(EnableIfBranded || (EnableIfBranded = {}));
function isPluginEnabled(t) {
    return t !== EnableIfBranded.DisabledPlugin && t !== null;
}
/**
 * Utility function to enable a plugin.
 */
function enableIf(condition, plugin) {
    if (condition) {
        return typeof plugin === 'function' ? plugin() : plugin;
    }
    return EnableIfBranded.DisabledPlugin;
}

// Note: This file is autogenerated using "resources/gen-version.js" script and
/**
 * An object containing the components of the GraphQL.js version string
 */

const versionInfo = Object.freeze({
  major: 16,
  minor: 6,
  patch: 0,
  preReleaseTag: null,
});

/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 */
function isPromise(value) {
  return (
    typeof (value === null || value === void 0 ? void 0 : value.then) ===
    'function'
  );
}

const MAX_SUGGESTIONS = 5;
/**
 * Given [ A, B, C ] return ' Did you mean A, B, or C?'.
 */

function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg
    ? [firstArg, secondArg]
    : [undefined, firstArg];
  let message = ' Did you mean ';

  if (subMessage) {
    message += subMessage + ' ';
  }

  const suggestions = suggestionsArg.map((x) => `"${x}"`);

  switch (suggestions.length) {
    case 0:
      return '';

    case 1:
      return message + suggestions[0] + '?';

    case 2:
      return message + suggestions[0] + ' or ' + suggestions[1] + '?';
  }

  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(', ') + ', or ' + lastItem + '?';
}

/**
 * Returns the first argument it receives.
 */
function identityFunc(x) {
  return x;
}

/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * for each value in the array.
 *
 * This provides a convenient lookup for the array items if the key function
 * produces unique results.
 * ```ts
 * const phoneBook = [
 *   { name: 'Jon', num: '555-1234' },
 *   { name: 'Jenny', num: '867-5309' }
 * ]
 *
 * const entriesByName = keyMap(
 *   phoneBook,
 *   entry => entry.name
 * )
 *
 * // {
 * //   Jon: { name: 'Jon', num: '555-1234' },
 * //   Jenny: { name: 'Jenny', num: '867-5309' }
 * // }
 *
 * const jennyEntry = entriesByName['Jenny']
 *
 * // { name: 'Jenny', num: '857-6309' }
 * ```
 */
function keyMap(list, keyFn) {
  const result = Object.create(null);

  for (const item of list) {
    result[keyFn(item)] = item;
  }

  return result;
}

/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * and a function to produce the values from each item in the array.
 * ```ts
 * const phoneBook = [
 *   { name: 'Jon', num: '555-1234' },
 *   { name: 'Jenny', num: '867-5309' }
 * ]
 *
 * // { Jon: '555-1234', Jenny: '867-5309' }
 * const phonesByName = keyValMap(
 *   phoneBook,
 *   entry => entry.name,
 *   entry => entry.num
 * )
 * ```
 */
function keyValMap(list, keyFn, valFn) {
  const result = Object.create(null);

  for (const item of list) {
    result[keyFn(item)] = valFn(item);
  }

  return result;
}

/**
 * Creates an object map with the same keys as `map` and values generated by
 * running each value of `map` thru `fn`.
 */
function mapValue(map, fn) {
  const result = Object.create(null);

  for (const key of Object.keys(map)) {
    result[key] = fn(map[key], key);
  }

  return result;
}

/**
 * Returns a number indicating whether a reference string comes before, or after,
 * or is the same as the given string in natural sort order.
 *
 * See: https://en.wikipedia.org/wiki/Natural_sort_order
 *
 */
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;

  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);

    if (isDigit(aChar) && isDigit(bChar)) {
      let aNum = 0;

      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit(aChar) && aNum > 0);

      let bNum = 0;

      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit(bChar) && bNum > 0);

      if (aNum < bNum) {
        return -1;
      }

      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }

      if (aChar > bChar) {
        return 1;
      }

      ++aIndex;
      ++bIndex;
    }
  }

  return aStr.length - bStr.length;
}
const DIGIT_0 = 48;
const DIGIT_9 = 57;

function isDigit(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}

/**
 * Given an invalid input string and a list of valid options, returns a filtered
 * list of valid options sorted based on their similarity with the input.
 */

function suggestionList(input, options) {
  const optionsByDistance = Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;

  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);

    if (distance !== undefined) {
      optionsByDistance[option] = distance;
    }
  }

  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
/**
 * Computes the lexical distance between strings A and B.
 *
 * The "distance" between two strings is given by counting the minimum number
 * of edits needed to transform string A into string B. An edit can be an
 * insertion, deletion, or substitution of a single character, or a swap of two
 * adjacent characters.
 *
 * Includes a custom alteration from Damerau-Levenshtein to treat case changes
 * as a single edit which helps identify mis-cased values with an edit distance
 * of 1.
 *
 * This distance can be useful for detecting typos in input or sorting
 */

class LexicalDistance {
  constructor(input) {
    this._input = input;
    this._inputLowerCase = input.toLowerCase();
    this._inputArray = stringToArray(this._inputLowerCase);
    this._rows = [
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0),
    ];
  }

  measure(option, threshold) {
    if (this._input === option) {
      return 0;
    }

    const optionLowerCase = option.toLowerCase(); // Any case change counts as a single edit

    if (this._inputLowerCase === optionLowerCase) {
      return 1;
    }

    let a = stringToArray(optionLowerCase);
    let b = this._inputArray;

    if (a.length < b.length) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    const aLength = a.length;
    const bLength = b.length;

    if (aLength - bLength > threshold) {
      return undefined;
    }

    const rows = this._rows;

    for (let j = 0; j <= bLength; j++) {
      rows[0][j] = j;
    }

    for (let i = 1; i <= aLength; i++) {
      const upRow = rows[(i - 1) % 3];
      const currentRow = rows[i % 3];
      let smallestCell = (currentRow[0] = i);

      for (let j = 1; j <= bLength; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let currentCell = Math.min(
          upRow[j] + 1, // delete
          currentRow[j - 1] + 1, // insert
          upRow[j - 1] + cost, // substitute
        );

        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          // transposition
          const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
        }

        if (currentCell < smallestCell) {
          smallestCell = currentCell;
        }

        currentRow[j] = currentCell;
      } // Early exit, since distance can't go smaller than smallest element of the previous row.

      if (smallestCell > threshold) {
        return undefined;
      }
    }

    const distance = rows[aLength % 3][bLength];
    return distance <= threshold ? distance : undefined;
  }
}

function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);

  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }

  return array;
}

function toObjMap(obj) {
  if (obj == null) {
    return Object.create(null);
  }

  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }

  const map = Object.create(null);

  for (const [key, value] of Object.entries(obj)) {
    map[key] = value;
  }

  return map;
}

/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
 * will reflect the provided GraphQL value AST.
 *
 * | GraphQL Value        | JavaScript Value |
 * | -------------------- | ---------------- |
 * | Input Object         | Object           |
 * | List                 | Array            |
 * | Boolean              | Boolean          |
 * | String / Enum        | String           |
 * | Int / Float          | Number           |
 * | Null                 | null             |
 *
 */

function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;

    case Kind.INT:
      return parseInt(valueNode.value, 10);

    case Kind.FLOAT:
      return parseFloat(valueNode.value);

    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;

    case Kind.LIST:
      return valueNode.values.map((node) =>
        valueFromASTUntyped(node, variables),
      );

    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables),
      );

    case Kind.VARIABLE:
      return variables === null || variables === void 0
        ? void 0
        : variables[valueNode.name.value];
  }
}

/**
 * Upholds the spec rules about naming.
 */

function assertName(name) {
  name != null || devAssert(false, 'Must provide name.');
  typeof name === 'string' || devAssert(false, 'Expected name to be a string.');

  if (name.length === 0) {
    throw new GraphQLError('Expected name to be a non-empty string.');
  }

  for (let i = 1; i < name.length; ++i) {
    if (!isNameContinue(name.charCodeAt(i))) {
      throw new GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`,
      );
    }
  }

  if (!isNameStart(name.charCodeAt(0))) {
    throw new GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`,
    );
  }

  return name;
}
/**
 * Upholds the spec rules about naming enum values.
 *
 * @internal
 */

function assertEnumValueName(name) {
  if (name === 'true' || name === 'false' || name === 'null') {
    throw new GraphQLError(`Enum values cannot be named: ${name}`);
  }

  return assertName(name);
}

function isType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    isInputObjectType(type) ||
    isListType(type) ||
    isNonNullType(type)
  );
}
/**
 * There are predicates for each kind of GraphQL type.
 */

function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
/**
 * These types may be used as input types for arguments and directives.
 */

function isInputType(type) {
  return (
    isScalarType(type) ||
    isEnumType(type) ||
    isInputObjectType(type) ||
    (isWrappingType(type) && isInputType(type.ofType))
  );
}
/**
 * These types may be used as output types as the result of fields.
 */

function isOutputType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    (isWrappingType(type) && isOutputType(type.ofType))
  );
}
/**
 * These types may describe types which may be leaf values.
 */

function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
/**
 * These types may describe the parent context of a selection set.
 */

function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
/**
 * These types may describe the parent context of a selection set.
 */

function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
/**
 * List Type Wrapper
 *
 * A list is a wrapping type which points to another type.
 * Lists are often created within the context of defining the fields of
 * an object type.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     parents: { type: new GraphQLList(PersonType) },
 *     children: { type: new GraphQLList(PersonType) },
 *   })
 * })
 * ```
 */

class GraphQLList {
  constructor(ofType) {
    isType(ofType) ||
      devAssert(false, `Expected ${inspect$1(ofType)} to be a GraphQL type.`);
    this.ofType = ofType;
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLList';
  }

  toString() {
    return '[' + String(this.ofType) + ']';
  }

  toJSON() {
    return this.toString();
  }
}
/**
 * Non-Null Type Wrapper
 *
 * A non-null is a wrapping type which points to another type.
 * Non-null types enforce that their values are never null and can ensure
 * an error is raised if this ever occurs during a request. It is useful for
 * fields which you can make a strong guarantee on non-nullability, for example
 * usually the id field of a database row will never be null.
 *
 * Example:
 *
 * ```ts
 * const RowType = new GraphQLObjectType({
 *   name: 'Row',
 *   fields: () => ({
 *     id: { type: new GraphQLNonNull(GraphQLString) },
 *   })
 * })
 * ```
 * Note: the enforcement of non-nullability occurs within the executor.
 */

class GraphQLNonNull {
  constructor(ofType) {
    isNullableType(ofType) ||
      devAssert(
        false,
        `Expected ${inspect$1(ofType)} to be a GraphQL nullable type.`,
      );
    this.ofType = ofType;
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLNonNull';
  }

  toString() {
    return String(this.ofType) + '!';
  }

  toJSON() {
    return this.toString();
  }
}
/**
 * These types wrap and modify other types
 */

function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
/**
 * These types can all accept null as a value.
 */

function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
/**
 * These named types do not include modifiers like List or NonNull.
 */

function isNamedType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    isInputObjectType(type)
  );
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;

    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }

    return unwrappedType;
  }
}
/**
 * Used while defining GraphQL types to allow for circular references in
 * otherwise immutable type definitions.
 */

function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Scalar Type Definition
 *
 * The leaf values of any request and input values to arguments are
 * Scalars (or Enums) and are defined with a name and a series of functions
 * used to parse input from ast or variables and to ensure validity.
 *
 * If a type's serialize function returns `null` or does not return a value
 * (i.e. it returns `undefined`) then an error will be raised and a `null`
 * value will be returned in the response. It is always better to validate
 *
 * Example:
 *
 * ```ts
 * const OddType = new GraphQLScalarType({
 *   name: 'Odd',
 *   serialize(value) {
 *     if (!Number.isFinite(value)) {
 *       throw new Error(
 *         `Scalar "Odd" cannot represent "${value}" since it is not a finite number.`,
 *       );
 *     }
 *
 *     if (value % 2 === 0) {
 *       throw new Error(`Scalar "Odd" cannot represent "${value}" since it is even.`);
 *     }
 *     return value;
 *   }
 * });
 * ```
 */
class GraphQLScalarType {
  constructor(config) {
    var _config$parseValue,
      _config$serialize,
      _config$parseLiteral,
      _config$extensionASTN;

    const parseValue =
      (_config$parseValue = config.parseValue) !== null &&
      _config$parseValue !== void 0
        ? _config$parseValue
        : identityFunc;
    this.name = assertName(config.name);
    this.description = config.description;
    this.specifiedByURL = config.specifiedByURL;
    this.serialize =
      (_config$serialize = config.serialize) !== null &&
      _config$serialize !== void 0
        ? _config$serialize
        : identityFunc;
    this.parseValue = parseValue;
    this.parseLiteral =
      (_config$parseLiteral = config.parseLiteral) !== null &&
      _config$parseLiteral !== void 0
        ? _config$parseLiteral
        : (node, variables) => parseValue(valueFromASTUntyped(node, variables));
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN = config.extensionASTNodes) !== null &&
      _config$extensionASTN !== void 0
        ? _config$extensionASTN
        : [];
    config.specifiedByURL == null ||
      typeof config.specifiedByURL === 'string' ||
      devAssert(
        false,
        `${this.name} must provide "specifiedByURL" as a string, ` +
          `but got: ${inspect$1(config.specifiedByURL)}.`,
      );
    config.serialize == null ||
      typeof config.serialize === 'function' ||
      devAssert(
        false,
        `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`,
      );

    if (config.parseLiteral) {
      (typeof config.parseValue === 'function' &&
        typeof config.parseLiteral === 'function') ||
        devAssert(
          false,
          `${this.name} must provide both "parseValue" and "parseLiteral" functions.`,
        );
    }
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLScalarType';
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      specifiedByURL: this.specifiedByURL,
      serialize: this.serialize,
      parseValue: this.parseValue,
      parseLiteral: this.parseLiteral,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Object Type Definition
 *
 * Almost all of the GraphQL types you define will be object types. Object types
 * have a name, but most importantly describe their fields.
 *
 * Example:
 *
 * ```ts
 * const AddressType = new GraphQLObjectType({
 *   name: 'Address',
 *   fields: {
 *     street: { type: GraphQLString },
 *     number: { type: GraphQLInt },
 *     formatted: {
 *       type: GraphQLString,
 *       resolve(obj) {
 *         return obj.number + ' ' + obj.street
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * When two types need to refer to each other, or a type needs to refer to
 * itself in a field, you can use a function expression (aka a closure or a
 * thunk) to supply the fields lazily.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     name: { type: GraphQLString },
 *     bestFriend: { type: PersonType },
 *   })
 * });
 * ```
 */
class GraphQLObjectType {
  constructor(config) {
    var _config$extensionASTN2;

    this.name = assertName(config.name);
    this.description = config.description;
    this.isTypeOf = config.isTypeOf;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN2 = config.extensionASTNodes) !== null &&
      _config$extensionASTN2 !== void 0
        ? _config$extensionASTN2
        : [];

    this._fields = () => defineFieldMap(config);

    this._interfaces = () => defineInterfaces(config);

    config.isTypeOf == null ||
      typeof config.isTypeOf === 'function' ||
      devAssert(
        false,
        `${this.name} must provide "isTypeOf" as a function, ` +
          `but got: ${inspect$1(config.isTypeOf)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLObjectType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  getInterfaces() {
    if (typeof this._interfaces === 'function') {
      this._interfaces = this._interfaces();
    }

    return this._interfaces;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      isTypeOf: this.isTypeOf,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineInterfaces(config) {
  var _config$interfaces;

  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null &&
      _config$interfaces !== void 0
      ? _config$interfaces
      : [],
  );
  Array.isArray(interfaces) ||
    devAssert(
      false,
      `${config.name} interfaces must be an Array or a function which returns an Array.`,
    );
  return interfaces;
}

function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) ||
    devAssert(
      false,
      `${config.name} fields must be an object with field names as keys or a function which returns such an object.`,
    );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;

    isPlainObj(fieldConfig) ||
      devAssert(
        false,
        `${config.name}.${fieldName} field config must be an object.`,
      );
    fieldConfig.resolve == null ||
      typeof fieldConfig.resolve === 'function' ||
      devAssert(
        false,
        `${config.name}.${fieldName} field resolver must be a function if ` +
          `provided, but got: ${inspect$1(fieldConfig.resolve)}.`,
      );
    const argsConfig =
      (_fieldConfig$args = fieldConfig.args) !== null &&
      _fieldConfig$args !== void 0
        ? _fieldConfig$args
        : {};
    isPlainObj(argsConfig) ||
      devAssert(
        false,
        `${config.name}.${fieldName} args must be an object with argument names as keys.`,
      );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode,
    };
  });
}

function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: assertName(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: toObjMap(argConfig.extensions),
    astNode: argConfig.astNode,
  }));
}

function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}

function fieldsToFieldsConfig(fields) {
  return mapValue(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode,
  }));
}
/**
 * @internal
 */

function argsToArgsConfig(args) {
  return keyValMap(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode,
    }),
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === undefined;
}

/**
 * Interface Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Interface type
 * is used to describe what types are possible, what fields are in common across
 * all types, as well as a function to determine which type is actually used
 * when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const EntityType = new GraphQLInterfaceType({
 *   name: 'Entity',
 *   fields: {
 *     name: { type: GraphQLString }
 *   }
 * });
 * ```
 */
class GraphQLInterfaceType {
  constructor(config) {
    var _config$extensionASTN3;

    this.name = assertName(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN3 = config.extensionASTNodes) !== null &&
      _config$extensionASTN3 !== void 0
        ? _config$extensionASTN3
        : [];
    this._fields = defineFieldMap.bind(undefined, config);
    this._interfaces = defineInterfaces.bind(undefined, config);
    config.resolveType == null ||
      typeof config.resolveType === 'function' ||
      devAssert(
        false,
        `${this.name} must provide "resolveType" as a function, ` +
          `but got: ${inspect$1(config.resolveType)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLInterfaceType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  getInterfaces() {
    if (typeof this._interfaces === 'function') {
      this._interfaces = this._interfaces();
    }

    return this._interfaces;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Union Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Union type
 * is used to describe what types are possible as well as providing a function
 * to determine which type is actually used when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const PetType = new GraphQLUnionType({
 *   name: 'Pet',
 *   types: [ DogType, CatType ],
 *   resolveType(value) {
 *     if (value instanceof Dog) {
 *       return DogType;
 *     }
 *     if (value instanceof Cat) {
 *       return CatType;
 *     }
 *   }
 * });
 * ```
 */
class GraphQLUnionType {
  constructor(config) {
    var _config$extensionASTN4;

    this.name = assertName(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN4 = config.extensionASTNodes) !== null &&
      _config$extensionASTN4 !== void 0
        ? _config$extensionASTN4
        : [];
    this._types = defineTypes.bind(undefined, config);
    config.resolveType == null ||
      typeof config.resolveType === 'function' ||
      devAssert(
        false,
        `${this.name} must provide "resolveType" as a function, ` +
          `but got: ${inspect$1(config.resolveType)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLUnionType';
  }

  getTypes() {
    if (typeof this._types === 'function') {
      this._types = this._types();
    }

    return this._types;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      types: this.getTypes(),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) ||
    devAssert(
      false,
      `Must provide Array of types or a function which returns such an array for Union ${config.name}.`,
    );
  return types;
}

/**
 * Enum Type Definition
 *
 * Some leaf values of requests and input values are Enums. GraphQL serializes
 * Enum values as strings, however internally Enums can be represented by any
 * kind of type, often integers.
 *
 * Example:
 *
 * ```ts
 * const RGBType = new GraphQLEnumType({
 *   name: 'RGB',
 *   values: {
 *     RED: { value: 0 },
 *     GREEN: { value: 1 },
 *     BLUE: { value: 2 }
 *   }
 * });
 * ```
 *
 * Note: If a value is not provided in a definition, the name of the enum value
 * will be used as its internal value.
 */
class GraphQLEnumType {
  /* <T> */
  constructor(config) {
    var _config$extensionASTN5;

    this.name = assertName(config.name);
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN5 = config.extensionASTNodes) !== null &&
      _config$extensionASTN5 !== void 0
        ? _config$extensionASTN5
        : [];
    this._values = defineEnumValues(this.name, config.values);
    this._valueLookup = new Map(
      this._values.map((enumValue) => [enumValue.value, enumValue]),
    );
    this._nameLookup = keyMap(this._values, (value) => value.name);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLEnumType';
  }

  getValues() {
    return this._values;
  }

  getValue(name) {
    return this._nameLookup[name];
  }

  serialize(outputValue) {
    const enumValue = this._valueLookup.get(outputValue);

    if (enumValue === undefined) {
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent value: ${inspect$1(outputValue)}`,
      );
    }

    return enumValue.name;
  }

  parseValue(inputValue) /* T */
  {
    if (typeof inputValue !== 'string') {
      const valueStr = inspect$1(inputValue);
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` +
          didYouMeanEnumValue(this, valueStr),
      );
    }

    const enumValue = this.getValue(inputValue);

    if (enumValue == null) {
      throw new GraphQLError(
        `Value "${inputValue}" does not exist in "${this.name}" enum.` +
          didYouMeanEnumValue(this, inputValue),
      );
    }

    return enumValue.value;
  }

  parseLiteral(valueNode, _variables) /* T */
  {
    // Note: variables will be resolved to a value before calling this function.
    if (valueNode.kind !== Kind.ENUM) {
      const valueStr = print(valueNode);
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` +
          didYouMeanEnumValue(this, valueStr),
        {
          nodes: valueNode,
        },
      );
    }

    const enumValue = this.getValue(valueNode.value);

    if (enumValue == null) {
      const valueStr = print(valueNode);
      throw new GraphQLError(
        `Value "${valueStr}" does not exist in "${this.name}" enum.` +
          didYouMeanEnumValue(this, valueStr),
        {
          nodes: valueNode,
        },
      );
    }

    return enumValue.value;
  }

  toConfig() {
    const values = keyValMap(
      this.getValues(),
      (value) => value.name,
      (value) => ({
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode,
      }),
    );
    return {
      name: this.name,
      description: this.description,
      values,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean('the enum value', suggestedValues);
}

function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) ||
    devAssert(
      false,
      `${typeName} values must be an object with value names as keys.`,
    );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) ||
      devAssert(
        false,
        `${typeName}.${valueName} must refer to an object with a "value" key ` +
          `representing an internal value but got: ${inspect$1(valueConfig)}.`,
      );
    return {
      name: assertEnumValueName(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== undefined ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode,
    };
  });
}

/**
 * Input Object Type Definition
 *
 * An input object defines a structured collection of fields which may be
 * supplied to a field argument.
 *
 * Using `NonNull` will ensure that a value must be provided by the query
 *
 * Example:
 *
 * ```ts
 * const GeoPoint = new GraphQLInputObjectType({
 *   name: 'GeoPoint',
 *   fields: {
 *     lat: { type: new GraphQLNonNull(GraphQLFloat) },
 *     lon: { type: new GraphQLNonNull(GraphQLFloat) },
 *     alt: { type: GraphQLFloat, defaultValue: 0 },
 *   }
 * });
 * ```
 */
class GraphQLInputObjectType {
  constructor(config) {
    var _config$extensionASTN6;

    this.name = assertName(config.name);
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN6 = config.extensionASTNodes) !== null &&
      _config$extensionASTN6 !== void 0
        ? _config$extensionASTN6
        : [];
    this._fields = defineInputFieldMap.bind(undefined, config);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLInputObjectType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  toConfig() {
    const fields = mapValue(this.getFields(), (field) => ({
      description: field.description,
      type: field.type,
      defaultValue: field.defaultValue,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode,
    }));
    return {
      name: this.name,
      description: this.description,
      fields,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) ||
    devAssert(
      false,
      `${config.name} fields must be an object with field names as keys or a function which returns such an object.`,
    );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    !('resolve' in fieldConfig) ||
      devAssert(
        false,
        `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`,
      );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode,
    };
  });
}

function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === undefined;
}

/**
 * Provided two types, return true if the types are equal (invariant).
 */
function isEqualType(typeA, typeB) {
  // Equivalent types are equal.
  if (typeA === typeB) {
    return true;
  } // If either type is non-null, the other must also be non-null.

  if (isNonNullType(typeA) && isNonNullType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // If either type is a list, the other must also be a list.

  if (isListType(typeA) && isListType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // Otherwise the types are not equal.

  return false;
}
/**
 * Provided a type and a super type, return true if the first type is either
 * equal or a subset of the second super type (covariant).
 */

function isTypeSubTypeOf(schema, maybeSubType, superType) {
  // Equivalent type is a valid subtype
  if (maybeSubType === superType) {
    return true;
  } // If superType is non-null, maybeSubType must also be non-null.

  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if (isNonNullType(maybeSubType)) {
    // If superType is nullable, maybeSubType may be non-null or nullable.
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  } // If superType type is a list, maybeSubType type must also be a list.

  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if (isListType(maybeSubType)) {
    // If superType is not a list, maybeSubType must also be not a list.
    return false;
  } // If superType type is an abstract type, check if it is super type of maybeSubType.
  // Otherwise, the child type is not a valid subtype of the parent type.

  return (
    isAbstractType(superType) &&
    (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) &&
    schema.isSubType(superType, maybeSubType)
  );
}
/**
 * Provided two composite types, determine if they "overlap". Two composite
 * types overlap when the Sets of possible concrete types for each intersect.
 *
 * This is often used to determine if a fragment of a given type could possibly
 * be visited in a context of another type.
 *
 * This function is commutative.
 */

function doTypesOverlap(schema, typeA, typeB) {
  // Equivalent types overlap
  if (typeA === typeB) {
    return true;
  }

  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      // If both types are abstract, then determine if there is any intersection
      // between possible concrete types of each.
      return schema
        .getPossibleTypes(typeA)
        .some((type) => schema.isSubType(typeB, type));
    } // Determine if the latter type is a possible concrete type of the former.

    return schema.isSubType(typeA, typeB);
  }

  if (isAbstractType(typeB)) {
    // Determine if the former type is a possible concrete type of the latter.
    return schema.isSubType(typeB, typeA);
  } // Otherwise the types do not overlap.

  return false;
}

/**
 * Maximum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe up-to 2^53 - 1
 * */

const GRAPHQL_MAX_INT = 2147483647;
/**
 * Minimum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe starting at -(2^53 - 1)
 * */

const GRAPHQL_MIN_INT = -2147483648;
const GraphQLInt = new GraphQLScalarType({
  name: 'Int',
  description:
    'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 1 : 0;
    }

    let num = coercedValue;

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = Number(coercedValue);
    }

    if (typeof num !== 'number' || !Number.isInteger(num)) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${inspect$1(coercedValue)}`,
      );
    }

    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        'Int cannot represent non 32-bit signed integer value: ' +
          inspect$1(coercedValue),
      );
    }

    return num;
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'number' || !Number.isInteger(inputValue)) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${inspect$1(inputValue)}`,
      );
    }

    if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${inputValue}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${print(valueNode)}`,
        {
          nodes: valueNode,
        },
      );
    }

    const num = parseInt(valueNode.value, 10);

    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
        {
          nodes: valueNode,
        },
      );
    }

    return num;
  },
});
const GraphQLFloat = new GraphQLScalarType({
  name: 'Float',
  description:
    'The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 1 : 0;
    }

    let num = coercedValue;

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = Number(coercedValue);
    }

    if (typeof num !== 'number' || !Number.isFinite(num)) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${inspect$1(coercedValue)}`,
      );
    }

    return num;
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'number' || !Number.isFinite(inputValue)) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${inspect$1(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${print(valueNode)}`,
        valueNode,
      );
    }

    return parseFloat(valueNode.value);
  },
});
const GraphQLString = new GraphQLScalarType({
  name: 'String',
  description:
    'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue); // Serialize string, boolean and number values to a string, but do not
    // attempt to coerce object, function, symbol, or other types as strings.

    if (typeof coercedValue === 'string') {
      return coercedValue;
    }

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 'true' : 'false';
    }

    if (typeof coercedValue === 'number' && Number.isFinite(coercedValue)) {
      return coercedValue.toString();
    }

    throw new GraphQLError(
      `String cannot represent value: ${inspect$1(outputValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'string') {
      throw new GraphQLError(
        `String cannot represent a non string value: ${inspect$1(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.STRING) {
      throw new GraphQLError(
        `String cannot represent a non string value: ${print(valueNode)}`,
        {
          nodes: valueNode,
        },
      );
    }

    return valueNode.value;
  },
});
const GraphQLBoolean = new GraphQLScalarType({
  name: 'Boolean',
  description: 'The `Boolean` scalar type represents `true` or `false`.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue;
    }

    if (Number.isFinite(coercedValue)) {
      return coercedValue !== 0;
    }

    throw new GraphQLError(
      `Boolean cannot represent a non boolean value: ${inspect$1(coercedValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'boolean') {
      throw new GraphQLError(
        `Boolean cannot represent a non boolean value: ${inspect$1(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.BOOLEAN) {
      throw new GraphQLError(
        `Boolean cannot represent a non boolean value: ${print(valueNode)}`,
        {
          nodes: valueNode,
        },
      );
    }

    return valueNode.value;
  },
});
const GraphQLID = new GraphQLScalarType({
  name: 'ID',
  description:
    'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'string') {
      return coercedValue;
    }

    if (Number.isInteger(coercedValue)) {
      return String(coercedValue);
    }

    throw new GraphQLError(
      `ID cannot represent value: ${inspect$1(outputValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue === 'string') {
      return inputValue;
    }

    if (typeof inputValue === 'number' && Number.isInteger(inputValue)) {
      return inputValue.toString();
    }

    throw new GraphQLError(`ID cannot represent value: ${inspect$1(inputValue)}`);
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        'ID cannot represent a non-string and non-integer value: ' +
          print(valueNode),
        {
          nodes: valueNode,
        },
      );
    }

    return valueNode.value;
  },
});
const specifiedScalarTypes = Object.freeze([
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
]);
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
} // Support serializing objects with custom valueOf() or toJSON() functions -
// a common way to represent a complex value which can be represented as
// a string (ex: MongoDB id objects).

function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === 'function') {
      const valueOfResult = outputValue.valueOf();

      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }

    if (typeof outputValue.toJSON === 'function') {
      return outputValue.toJSON();
    }
  }

  return outputValue;
}

/**
 * Test if the given value is a GraphQL directive.
 */

function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */
class GraphQLDirective {
  constructor(config) {
    var _config$isRepeatable, _config$args;

    this.name = assertName(config.name);
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable =
      (_config$isRepeatable = config.isRepeatable) !== null &&
      _config$isRepeatable !== void 0
        ? _config$isRepeatable
        : false;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    Array.isArray(config.locations) ||
      devAssert(false, `@${config.name} locations must be an Array.`);
    const args =
      (_config$args = config.args) !== null && _config$args !== void 0
        ? _config$args
        : {};
    (isObjectLike(args) && !Array.isArray(args)) ||
      devAssert(
        false,
        `@${config.name} args must be an object with argument names as keys.`,
      );
    this.args = defineArguments(args);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLDirective';
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: argsToArgsConfig(this.args),
      isRepeatable: this.isRepeatable,
      extensions: this.extensions,
      astNode: this.astNode,
    };
  }

  toString() {
    return '@' + this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Used to conditionally include fields or fragments.
 */
const GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description:
    'Directs the executor to include this field or fragment only when the `if` argument is true.',
  locations: [
    DirectiveLocation$1.FIELD,
    DirectiveLocation$1.FRAGMENT_SPREAD,
    DirectiveLocation$1.INLINE_FRAGMENT,
  ],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Included when true.',
    },
  },
});
/**
 * Used to conditionally skip (exclude) fields or fragments.
 */

const GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description:
    'Directs the executor to skip this field or fragment when the `if` argument is true.',
  locations: [
    DirectiveLocation$1.FIELD,
    DirectiveLocation$1.FRAGMENT_SPREAD,
    DirectiveLocation$1.INLINE_FRAGMENT,
  ],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Skipped when true.',
    },
  },
});
/**
 * Constant string used for default reason for a deprecation.
 */

const DEFAULT_DEPRECATION_REASON = 'No longer supported';
/**
 * Used to declare element of a GraphQL schema as deprecated.
 */

const GraphQLDeprecatedDirective = new GraphQLDirective({
  name: 'deprecated',
  description: 'Marks an element of a GraphQL schema as no longer supported.',
  locations: [
    DirectiveLocation$1.FIELD_DEFINITION,
    DirectiveLocation$1.ARGUMENT_DEFINITION,
    DirectiveLocation$1.INPUT_FIELD_DEFINITION,
    DirectiveLocation$1.ENUM_VALUE,
  ],
  args: {
    reason: {
      type: GraphQLString,
      description:
        'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).',
      defaultValue: DEFAULT_DEPRECATION_REASON,
    },
  },
});
/**
 * Used to provide a URL for specifying the behavior of custom scalar definitions.
 */

const GraphQLSpecifiedByDirective = new GraphQLDirective({
  name: 'specifiedBy',
  description: 'Exposes a URL that specifies the behavior of this scalar.',
  locations: [DirectiveLocation$1.SCALAR],
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The URL that specifies the behavior of this scalar.',
    },
  },
});
/**
 * The full list of specified directives.
 */

const specifiedDirectives = Object.freeze([
  GraphQLIncludeDirective,
  GraphQLSkipDirective,
  GraphQLDeprecatedDirective,
  GraphQLSpecifiedByDirective,
]);
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(({ name }) => name === directive.name);
}

/**
 * Returns true if the provided object is an Object (i.e. not a string literal)
 * and implements the Iterator protocol.
 *
 * This may be used in place of [Array.isArray()][isArray] to determine if
 * an object should be iterated-over e.g. Array, Map, Set, Int8Array,
 * TypedArray, etc. but excludes string literals.
 *
 * @example
 * ```ts
 * isIterableObject([ 1, 2, 3 ]) // true
 * isIterableObject(new Map()) // true
 * isIterableObject('ABC') // false
 * isIterableObject({ key: 'value' }) // false
 * isIterableObject({ length: 1, 0: 'Alpha' }) // false
 * ```
 */
function isIterableObject(maybeIterable) {
  return (
    typeof maybeIterable === 'object' &&
    typeof (maybeIterable === null || maybeIterable === void 0
      ? void 0
      : maybeIterable[Symbol.iterator]) === 'function'
  );
}

/**
 * Produces a GraphQL Value AST given a JavaScript object.
 * Function will match JavaScript/JSON values to GraphQL AST schema format
 * by using suggested GraphQLInputType. For example:
 *
 *     astFromValue("value", GraphQLString)
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * JavaScript values.
 *
 * | JSON Value    | GraphQL Value        |
 * | ------------- | -------------------- |
 * | Object        | Input Object         |
 * | Array         | List                 |
 * | Boolean       | Boolean              |
 * | String        | String / Enum Value  |
 * | Number        | Int / Float          |
 * | Unknown       | Enum Value           |
 * | null          | NullValue            |
 *
 */

function astFromValue(value, type) {
  if (isNonNullType(type)) {
    const astValue = astFromValue(value, type.ofType);

    if (
      (astValue === null || astValue === void 0 ? void 0 : astValue.kind) ===
      Kind.NULL
    ) {
      return null;
    }

    return astValue;
  } // only explicit null, not undefined, NaN

  if (value === null) {
    return {
      kind: Kind.NULL,
    };
  } // undefined

  if (value === undefined) {
    return null;
  } // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
  // the value is not an array, convert the value using the list's item type.

  if (isListType(type)) {
    const itemType = type.ofType;

    if (isIterableObject(value)) {
      const valuesNodes = [];

      for (const item of value) {
        const itemNode = astFromValue(item, itemType);

        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }

      return {
        kind: Kind.LIST,
        values: valuesNodes,
      };
    }

    return astFromValue(value, itemType);
  } // Populate the fields of the input object by creating ASTs from each value
  // in the JavaScript object according to the fields in the input type.

  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }

    const fieldNodes = [];

    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);

      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name,
          },
          value: fieldValue,
        });
      }
    }

    return {
      kind: Kind.OBJECT,
      fields: fieldNodes,
    };
  }

  if (isLeafType(type)) {
    // Since value is an internally represented value, it must be serialized
    // to an externally represented value before converting into an AST.
    const serialized = type.serialize(value);

    if (serialized == null) {
      return null;
    } // Others serialize based on their corresponding JavaScript scalar types.

    if (typeof serialized === 'boolean') {
      return {
        kind: Kind.BOOLEAN,
        value: serialized,
      };
    } // JavaScript numbers can be Int or Float values.

    if (typeof serialized === 'number' && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp$1.test(stringNum)
        ? {
            kind: Kind.INT,
            value: stringNum,
          }
        : {
            kind: Kind.FLOAT,
            value: stringNum,
          };
    }

    if (typeof serialized === 'string') {
      // Enum types use Enum literals.
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized,
        };
      } // ID types can use Int literals.

      if (type === GraphQLID && integerStringRegExp$1.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized,
        };
      }

      return {
        kind: Kind.STRING,
        value: serialized,
      };
    }

    throw new TypeError(`Cannot convert value to AST: ${inspect$1(serialized)}.`);
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

  invariant$1(false, 'Unexpected input type: ' + inspect$1(type));
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */

const integerStringRegExp$1 = /^-?(?:0|[1-9][0-9]*)$/;

const __Schema = new GraphQLObjectType({
  name: '__Schema',
  description:
    'A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.',
  fields: () => ({
    description: {
      type: GraphQLString,
      resolve: (schema) => schema.description,
    },
    types: {
      description: 'A list of all types supported by this server.',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),

      resolve(schema) {
        return Object.values(schema.getTypeMap());
      },
    },
    queryType: {
      description: 'The type that query operations will be rooted at.',
      type: new GraphQLNonNull(__Type),
      resolve: (schema) => schema.getQueryType(),
    },
    mutationType: {
      description:
        'If this server supports mutation, the type that mutation operations will be rooted at.',
      type: __Type,
      resolve: (schema) => schema.getMutationType(),
    },
    subscriptionType: {
      description:
        'If this server support subscription, the type that subscription operations will be rooted at.',
      type: __Type,
      resolve: (schema) => schema.getSubscriptionType(),
    },
    directives: {
      description: 'A list of all directives supported by this server.',
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__Directive)),
      ),
      resolve: (schema) => schema.getDirectives(),
    },
  }),
});
const __Directive = new GraphQLObjectType({
  name: '__Directive',
  description:
    "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (directive) => directive.name,
    },
    description: {
      type: GraphQLString,
      resolve: (directive) => directive.description,
    },
    isRepeatable: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (directive) => directive.isRepeatable,
    },
    locations: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__DirectiveLocation)),
      ),
      resolve: (directive) => directive.locations,
    },
    args: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__InputValue)),
      ),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(field, { includeDeprecated }) {
        return includeDeprecated
          ? field.args
          : field.args.filter((arg) => arg.deprecationReason == null);
      },
    },
  }),
});
const __DirectiveLocation = new GraphQLEnumType({
  name: '__DirectiveLocation',
  description:
    'A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.',
  values: {
    QUERY: {
      value: DirectiveLocation$1.QUERY,
      description: 'Location adjacent to a query operation.',
    },
    MUTATION: {
      value: DirectiveLocation$1.MUTATION,
      description: 'Location adjacent to a mutation operation.',
    },
    SUBSCRIPTION: {
      value: DirectiveLocation$1.SUBSCRIPTION,
      description: 'Location adjacent to a subscription operation.',
    },
    FIELD: {
      value: DirectiveLocation$1.FIELD,
      description: 'Location adjacent to a field.',
    },
    FRAGMENT_DEFINITION: {
      value: DirectiveLocation$1.FRAGMENT_DEFINITION,
      description: 'Location adjacent to a fragment definition.',
    },
    FRAGMENT_SPREAD: {
      value: DirectiveLocation$1.FRAGMENT_SPREAD,
      description: 'Location adjacent to a fragment spread.',
    },
    INLINE_FRAGMENT: {
      value: DirectiveLocation$1.INLINE_FRAGMENT,
      description: 'Location adjacent to an inline fragment.',
    },
    VARIABLE_DEFINITION: {
      value: DirectiveLocation$1.VARIABLE_DEFINITION,
      description: 'Location adjacent to a variable definition.',
    },
    SCHEMA: {
      value: DirectiveLocation$1.SCHEMA,
      description: 'Location adjacent to a schema definition.',
    },
    SCALAR: {
      value: DirectiveLocation$1.SCALAR,
      description: 'Location adjacent to a scalar definition.',
    },
    OBJECT: {
      value: DirectiveLocation$1.OBJECT,
      description: 'Location adjacent to an object type definition.',
    },
    FIELD_DEFINITION: {
      value: DirectiveLocation$1.FIELD_DEFINITION,
      description: 'Location adjacent to a field definition.',
    },
    ARGUMENT_DEFINITION: {
      value: DirectiveLocation$1.ARGUMENT_DEFINITION,
      description: 'Location adjacent to an argument definition.',
    },
    INTERFACE: {
      value: DirectiveLocation$1.INTERFACE,
      description: 'Location adjacent to an interface definition.',
    },
    UNION: {
      value: DirectiveLocation$1.UNION,
      description: 'Location adjacent to a union definition.',
    },
    ENUM: {
      value: DirectiveLocation$1.ENUM,
      description: 'Location adjacent to an enum definition.',
    },
    ENUM_VALUE: {
      value: DirectiveLocation$1.ENUM_VALUE,
      description: 'Location adjacent to an enum value definition.',
    },
    INPUT_OBJECT: {
      value: DirectiveLocation$1.INPUT_OBJECT,
      description: 'Location adjacent to an input object type definition.',
    },
    INPUT_FIELD_DEFINITION: {
      value: DirectiveLocation$1.INPUT_FIELD_DEFINITION,
      description: 'Location adjacent to an input object field definition.',
    },
  },
});
const __Type = new GraphQLObjectType({
  name: '__Type',
  description:
    'The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.',
  fields: () => ({
    kind: {
      type: new GraphQLNonNull(__TypeKind),

      resolve(type) {
        if (isScalarType(type)) {
          return TypeKind.SCALAR;
        }

        if (isObjectType(type)) {
          return TypeKind.OBJECT;
        }

        if (isInterfaceType(type)) {
          return TypeKind.INTERFACE;
        }

        if (isUnionType(type)) {
          return TypeKind.UNION;
        }

        if (isEnumType(type)) {
          return TypeKind.ENUM;
        }

        if (isInputObjectType(type)) {
          return TypeKind.INPUT_OBJECT;
        }

        if (isListType(type)) {
          return TypeKind.LIST;
        }

        if (isNonNullType(type)) {
          return TypeKind.NON_NULL;
        }
        /* c8 ignore next 3 */
        // Not reachable, all possible types have been considered)

        invariant$1(false, `Unexpected type: "${inspect$1(type)}".`);
      },
    },
    name: {
      type: GraphQLString,
      resolve: (type) => ('name' in type ? type.name : undefined),
    },
    description: {
      type: GraphQLString,
      resolve: (
        type, // FIXME: add test case
      ) =>
        /* c8 ignore next */
        'description' in type ? type.description : undefined,
    },
    specifiedByURL: {
      type: GraphQLString,
      resolve: (obj) =>
        'specifiedByURL' in obj ? obj.specifiedByURL : undefined,
    },
    fields: {
      type: new GraphQLList(new GraphQLNonNull(__Field)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if (isObjectType(type) || isInterfaceType(type)) {
          const fields = Object.values(type.getFields());
          return includeDeprecated
            ? fields
            : fields.filter((field) => field.deprecationReason == null);
        }
      },
    },
    interfaces: {
      type: new GraphQLList(new GraphQLNonNull(__Type)),

      resolve(type) {
        if (isObjectType(type) || isInterfaceType(type)) {
          return type.getInterfaces();
        }
      },
    },
    possibleTypes: {
      type: new GraphQLList(new GraphQLNonNull(__Type)),

      resolve(type, _args, _context, { schema }) {
        if (isAbstractType(type)) {
          return schema.getPossibleTypes(type);
        }
      },
    },
    enumValues: {
      type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if (isEnumType(type)) {
          const values = type.getValues();
          return includeDeprecated
            ? values
            : values.filter((field) => field.deprecationReason == null);
        }
      },
    },
    inputFields: {
      type: new GraphQLList(new GraphQLNonNull(__InputValue)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if (isInputObjectType(type)) {
          const values = Object.values(type.getFields());
          return includeDeprecated
            ? values
            : values.filter((field) => field.deprecationReason == null);
        }
      },
    },
    ofType: {
      type: __Type,
      resolve: (type) => ('ofType' in type ? type.ofType : undefined),
    },
  }),
});
const __Field = new GraphQLObjectType({
  name: '__Field',
  description:
    'Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (field) => field.name,
    },
    description: {
      type: GraphQLString,
      resolve: (field) => field.description,
    },
    args: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__InputValue)),
      ),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(field, { includeDeprecated }) {
        return includeDeprecated
          ? field.args
          : field.args.filter((arg) => arg.deprecationReason == null);
      },
    },
    type: {
      type: new GraphQLNonNull(__Type),
      resolve: (field) => field.type,
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null,
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (field) => field.deprecationReason,
    },
  }),
});
const __InputValue = new GraphQLObjectType({
  name: '__InputValue',
  description:
    'Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (inputValue) => inputValue.name,
    },
    description: {
      type: GraphQLString,
      resolve: (inputValue) => inputValue.description,
    },
    type: {
      type: new GraphQLNonNull(__Type),
      resolve: (inputValue) => inputValue.type,
    },
    defaultValue: {
      type: GraphQLString,
      description:
        'A GraphQL-formatted string representing the default value for this input value.',

      resolve(inputValue) {
        const { type, defaultValue } = inputValue;
        const valueAST = astFromValue(defaultValue, type);
        return valueAST ? print(valueAST) : null;
      },
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null,
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (obj) => obj.deprecationReason,
    },
  }),
});
const __EnumValue = new GraphQLObjectType({
  name: '__EnumValue',
  description:
    'One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (enumValue) => enumValue.name,
    },
    description: {
      type: GraphQLString,
      resolve: (enumValue) => enumValue.description,
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (enumValue) => enumValue.deprecationReason != null,
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (enumValue) => enumValue.deprecationReason,
    },
  }),
});
var TypeKind;

(function (TypeKind) {
  TypeKind['SCALAR'] = 'SCALAR';
  TypeKind['OBJECT'] = 'OBJECT';
  TypeKind['INTERFACE'] = 'INTERFACE';
  TypeKind['UNION'] = 'UNION';
  TypeKind['ENUM'] = 'ENUM';
  TypeKind['INPUT_OBJECT'] = 'INPUT_OBJECT';
  TypeKind['LIST'] = 'LIST';
  TypeKind['NON_NULL'] = 'NON_NULL';
})(TypeKind || (TypeKind = {}));
const __TypeKind = new GraphQLEnumType({
  name: '__TypeKind',
  description: 'An enum describing what kind of type a given `__Type` is.',
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: 'Indicates this type is a scalar.',
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description:
        'Indicates this type is an object. `fields` and `interfaces` are valid fields.',
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description:
        'Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields.',
    },
    UNION: {
      value: TypeKind.UNION,
      description:
        'Indicates this type is a union. `possibleTypes` is a valid field.',
    },
    ENUM: {
      value: TypeKind.ENUM,
      description:
        'Indicates this type is an enum. `enumValues` is a valid field.',
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description:
        'Indicates this type is an input object. `inputFields` is a valid field.',
    },
    LIST: {
      value: TypeKind.LIST,
      description: 'Indicates this type is a list. `ofType` is a valid field.',
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description:
        'Indicates this type is a non-null. `ofType` is a valid field.',
    },
  },
});
/**
 * Note that these are GraphQLField and not GraphQLFieldConfig,
 * so the format for args is different.
 */

const SchemaMetaFieldDef = {
  name: '__schema',
  type: new GraphQLNonNull(__Schema),
  description: 'Access the current type schema of this server.',
  args: [],
  resolve: (_source, _args, _context, { schema }) => schema,
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const TypeMetaFieldDef = {
  name: '__type',
  type: __Type,
  description: 'Request the type information of a single type.',
  args: [
    {
      name: 'name',
      description: undefined,
      type: new GraphQLNonNull(GraphQLString),
      defaultValue: undefined,
      deprecationReason: undefined,
      extensions: Object.create(null),
      astNode: undefined,
    },
  ],
  resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const TypeNameMetaFieldDef = {
  name: '__typename',
  type: new GraphQLNonNull(GraphQLString),
  description: 'The name of the current Object type at runtime.',
  args: [],
  resolve: (_source, _args, _context, { parentType }) => parentType.name,
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const introspectionTypes = Object.freeze([
  __Schema,
  __Directive,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
  __EnumValue,
  __TypeKind,
]);
function isIntrospectionType(type) {
  return introspectionTypes.some(({ name }) => type.name === name);
}

/**
 * Test if the given value is a GraphQL schema.
 */

function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error(`Expected ${inspect$1(schema)} to be a GraphQL schema.`);
  }

  return schema;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Schema Definition
 *
 * A Schema is created by supplying the root types of each type of operation,
 * query and mutation (optional). A schema definition is then supplied to the
 * validator and executor.
 *
 * Example:
 *
 * ```ts
 * const MyAppSchema = new GraphQLSchema({
 *   query: MyAppQueryRootType,
 *   mutation: MyAppMutationRootType,
 * })
 * ```
 *
 * Note: When the schema is constructed, by default only the types that are
 * reachable by traversing the root types are included, other types must be
 * explicitly referenced.
 *
 * Example:
 *
 * ```ts
 * const characterInterface = new GraphQLInterfaceType({
 *   name: 'Character',
 *   ...
 * });
 *
 * const humanType = new GraphQLObjectType({
 *   name: 'Human',
 *   interfaces: [characterInterface],
 *   ...
 * });
 *
 * const droidType = new GraphQLObjectType({
 *   name: 'Droid',
 *   interfaces: [characterInterface],
 *   ...
 * });
 *
 * const schema = new GraphQLSchema({
 *   query: new GraphQLObjectType({
 *     name: 'Query',
 *     fields: {
 *       hero: { type: characterInterface, ... },
 *     }
 *   }),
 *   ...
 *   // Since this schema references only the `Character` interface it's
 *   // necessary to explicitly list the types that implement it if
 *   // you want them to be included in the final schema.
 *   types: [humanType, droidType],
 * })
 * ```
 *
 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
 * the exact list of directives represented and allowed. If `directives` is not
 * provided then a default set of the specified directives (e.g. `@include` and
 * `@skip`) will be used. If you wish to provide *additional* directives to these
 * specified directives, you must explicitly declare them. Example:
 *
 * ```ts
 * const MyAppSchema = new GraphQLSchema({
 *   ...
 *   directives: specifiedDirectives.concat([ myCustomDirective ]),
 * })
 * ```
 */
class GraphQLSchema {
  // Used as a cache for validateSchema().
  constructor(config) {
    var _config$extensionASTN, _config$directives;

    // If this schema was built from a source known to be valid, then it may be
    // marked with assumeValid to avoid an additional type system validation.
    this.__validationErrors = config.assumeValid === true ? [] : undefined; // Check for common mistakes during construction to produce early errors.

    isObjectLike(config) ||
      devAssert(false, 'Must provide configuration object.');
    !config.types ||
      Array.isArray(config.types) ||
      devAssert(
        false,
        `"types" must be Array if provided but got: ${inspect$1(config.types)}.`,
      );
    !config.directives ||
      Array.isArray(config.directives) ||
      devAssert(
        false,
        '"directives" must be Array if provided but got: ' +
          `${inspect$1(config.directives)}.`,
      );
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN = config.extensionASTNodes) !== null &&
      _config$extensionASTN !== void 0
        ? _config$extensionASTN
        : [];
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription; // Provide specified directives (e.g. @include and @skip) by default.

    this._directives =
      (_config$directives = config.directives) !== null &&
      _config$directives !== void 0
        ? _config$directives
        : specifiedDirectives; // To preserve order of user-provided types, we add first to add them to
    // the set of "collected" types, so `collectReferencedTypes` ignore them.

    const allReferencedTypes = new Set(config.types);

    if (config.types != null) {
      for (const type of config.types) {
        // When we ready to process this type, we remove it from "collected" types
        // and then add it together with all dependent types in the correct position.
        allReferencedTypes.delete(type);
        collectReferencedTypes(type, allReferencedTypes);
      }
    }

    if (this._queryType != null) {
      collectReferencedTypes(this._queryType, allReferencedTypes);
    }

    if (this._mutationType != null) {
      collectReferencedTypes(this._mutationType, allReferencedTypes);
    }

    if (this._subscriptionType != null) {
      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
    }

    for (const directive of this._directives) {
      // Directives are not validated until validateSchema() is called.
      if (isDirective(directive)) {
        for (const arg of directive.args) {
          collectReferencedTypes(arg.type, allReferencedTypes);
        }
      }
    }

    collectReferencedTypes(__Schema, allReferencedTypes); // Storing the resulting map for reference by the schema.

    this._typeMap = Object.create(null);
    this._subTypeMap = Object.create(null); // Keep track of all implementations by interface name.

    this._implementationsMap = Object.create(null);

    for (const namedType of allReferencedTypes) {
      if (namedType == null) {
        continue;
      }

      const typeName = namedType.name;
      typeName ||
        devAssert(
          false,
          'One of the provided types for building the Schema is missing a name.',
        );

      if (this._typeMap[typeName] !== undefined) {
        throw new Error(
          `Schema must contain uniquely named types but contains multiple types named "${typeName}".`,
        );
      }

      this._typeMap[typeName] = namedType;

      if (isInterfaceType(namedType)) {
        // Store implementations by interface.
        for (const iface of namedType.getInterfaces()) {
          if (isInterfaceType(iface)) {
            let implementations = this._implementationsMap[iface.name];

            if (implementations === undefined) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: [],
              };
            }

            implementations.interfaces.push(namedType);
          }
        }
      } else if (isObjectType(namedType)) {
        // Store implementations by objects.
        for (const iface of namedType.getInterfaces()) {
          if (isInterfaceType(iface)) {
            let implementations = this._implementationsMap[iface.name];

            if (implementations === undefined) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: [],
              };
            }

            implementations.objects.push(namedType);
          }
        }
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLSchema';
  }

  getQueryType() {
    return this._queryType;
  }

  getMutationType() {
    return this._mutationType;
  }

  getSubscriptionType() {
    return this._subscriptionType;
  }

  getRootType(operation) {
    switch (operation) {
      case OperationTypeNode.QUERY:
        return this.getQueryType();

      case OperationTypeNode.MUTATION:
        return this.getMutationType();

      case OperationTypeNode.SUBSCRIPTION:
        return this.getSubscriptionType();
    }
  }

  getTypeMap() {
    return this._typeMap;
  }

  getType(name) {
    return this.getTypeMap()[name];
  }

  getPossibleTypes(abstractType) {
    return isUnionType(abstractType)
      ? abstractType.getTypes()
      : this.getImplementations(abstractType).objects;
  }

  getImplementations(interfaceType) {
    const implementations = this._implementationsMap[interfaceType.name];
    return implementations !== null && implementations !== void 0
      ? implementations
      : {
          objects: [],
          interfaces: [],
        };
  }

  isSubType(abstractType, maybeSubType) {
    let map = this._subTypeMap[abstractType.name];

    if (map === undefined) {
      map = Object.create(null);

      if (isUnionType(abstractType)) {
        for (const type of abstractType.getTypes()) {
          map[type.name] = true;
        }
      } else {
        const implementations = this.getImplementations(abstractType);

        for (const type of implementations.objects) {
          map[type.name] = true;
        }

        for (const type of implementations.interfaces) {
          map[type.name] = true;
        }
      }

      this._subTypeMap[abstractType.name] = map;
    }

    return map[maybeSubType.name] !== undefined;
  }

  getDirectives() {
    return this._directives;
  }

  getDirective(name) {
    return this.getDirectives().find((directive) => directive.name === name);
  }

  toConfig() {
    return {
      description: this.description,
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      types: Object.values(this.getTypeMap()),
      directives: this.getDirectives(),
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
      assumeValid: this.__validationErrors !== undefined,
    };
  }
}

function collectReferencedTypes(type, typeSet) {
  const namedType = getNamedType(type);

  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);

    if (isUnionType(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }

      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);

        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }

  return typeSet;
}

/**
 * Implements the "Type Validation" sub-sections of the specification's
 * "Type System" section.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the Schema is valid.
 */

function validateSchema(schema) {
  // First check to ensure the provided value is in fact a GraphQLSchema.
  assertSchema(schema); // If this Schema has already been validated, return the previous results.

  if (schema.__validationErrors) {
    return schema.__validationErrors;
  } // Validate the schema, producing a list of errors.

  const context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context); // Persist the results of validation before returning to ensure validation
  // does not run multiple times for this schema.

  const errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
/**
 * Utility function which asserts a schema is valid by throwing an error if
 * it is invalid.
 */

function assertValidSchema(schema) {
  const errors = validateSchema(schema);

  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join('\n\n'));
  }
}

class SchemaValidationContext {
  constructor(schema) {
    this._errors = [];
    this.schema = schema;
  }

  reportError(message, nodes) {
    const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;

    this._errors.push(
      new GraphQLError(message, {
        nodes: _nodes,
      }),
    );
  }

  getErrors() {
    return this._errors;
  }
}

function validateRootTypes(context) {
  const schema = context.schema;
  const queryType = schema.getQueryType();

  if (!queryType) {
    context.reportError('Query root type must be provided.', schema.astNode);
  } else if (!isObjectType(queryType)) {
    var _getOperationTypeNode;

    context.reportError(
      `Query root type must be Object type, it cannot be ${inspect$1(
        queryType,
      )}.`,
      (_getOperationTypeNode = getOperationTypeNode(
        schema,
        OperationTypeNode.QUERY,
      )) !== null && _getOperationTypeNode !== void 0
        ? _getOperationTypeNode
        : queryType.astNode,
    );
  }

  const mutationType = schema.getMutationType();

  if (mutationType && !isObjectType(mutationType)) {
    var _getOperationTypeNode2;

    context.reportError(
      'Mutation root type must be Object type if provided, it cannot be ' +
        `${inspect$1(mutationType)}.`,
      (_getOperationTypeNode2 = getOperationTypeNode(
        schema,
        OperationTypeNode.MUTATION,
      )) !== null && _getOperationTypeNode2 !== void 0
        ? _getOperationTypeNode2
        : mutationType.astNode,
    );
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && !isObjectType(subscriptionType)) {
    var _getOperationTypeNode3;

    context.reportError(
      'Subscription root type must be Object type if provided, it cannot be ' +
        `${inspect$1(subscriptionType)}.`,
      (_getOperationTypeNode3 = getOperationTypeNode(
        schema,
        OperationTypeNode.SUBSCRIPTION,
      )) !== null && _getOperationTypeNode3 !== void 0
        ? _getOperationTypeNode3
        : subscriptionType.astNode,
    );
  }
}

function getOperationTypeNode(schema, operation) {
  var _flatMap$find;

  return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes]
    .flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (schemaNode) => {
        var _schemaNode$operation;

        return (
          /* c8 ignore next */
          (_schemaNode$operation =
            schemaNode === null || schemaNode === void 0
              ? void 0
              : schemaNode.operationTypes) !== null &&
            _schemaNode$operation !== void 0
            ? _schemaNode$operation
            : []
        );
      },
    )
    .find((operationNode) => operationNode.operation === operation)) === null ||
    _flatMap$find === void 0
    ? void 0
    : _flatMap$find.type;
}

function validateDirectives(context) {
  for (const directive of context.schema.getDirectives()) {
    // Ensure all directives are in fact GraphQL directives.
    if (!isDirective(directive)) {
      context.reportError(
        `Expected directive but got: ${inspect$1(directive)}.`,
        directive === null || directive === void 0 ? void 0 : directive.astNode,
      );
      continue;
    } // Ensure they are named correctly.

    validateName(context, directive); // TODO: Ensure proper locations.
    // Ensure the arguments are valid.

    for (const arg of directive.args) {
      // Ensure they are named correctly.
      validateName(context, arg); // Ensure the type is an input type.

      if (!isInputType(arg.type)) {
        context.reportError(
          `The type of @${directive.name}(${arg.name}:) must be Input Type ` +
            `but got: ${inspect$1(arg.type)}.`,
          arg.astNode,
        );
      }

      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode;

        context.reportError(
          `Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0
              ? void 0
              : _arg$astNode.type,
          ],
        );
      }
    }
  }
}

function validateName(context, node) {
  // Ensure names are valid, however introspection types opt out.
  if (node.name.startsWith('__')) {
    context.reportError(
      `Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`,
      node.astNode,
    );
  }
}

function validateTypes(context) {
  const validateInputObjectCircularRefs =
    createInputObjectCircularRefsValidator(context);
  const typeMap = context.schema.getTypeMap();

  for (const type of Object.values(typeMap)) {
    // Ensure all provided types are in fact GraphQL type.
    if (!isNamedType(type)) {
      context.reportError(
        `Expected GraphQL named type but got: ${inspect$1(type)}.`,
        type.astNode,
      );
      continue;
    } // Ensure it is named correctly (excluding introspection types).

    if (!isIntrospectionType(type)) {
      validateName(context, type);
    }

    if (isObjectType(type)) {
      // Ensure fields are valid
      validateFields(context, type); // Ensure objects implement the interfaces they claim to.

      validateInterfaces(context, type);
    } else if (isInterfaceType(type)) {
      // Ensure fields are valid.
      validateFields(context, type); // Ensure interfaces implement the interfaces they claim to.

      validateInterfaces(context, type);
    } else if (isUnionType(type)) {
      // Ensure Unions include valid member types.
      validateUnionMembers(context, type);
    } else if (isEnumType(type)) {
      // Ensure Enums have valid values.
      validateEnumValues(context, type);
    } else if (isInputObjectType(type)) {
      // Ensure Input Object fields are valid.
      validateInputFields(context, type); // Ensure Input Objects do not contain non-nullable circular references

      validateInputObjectCircularRefs(type);
    }
  }
}

function validateFields(context, type) {
  const fields = Object.values(type.getFields()); // Objects and Interfaces both must define one or more fields.

  if (fields.length === 0) {
    context.reportError(`Type ${type.name} must define one or more fields.`, [
      type.astNode,
      ...type.extensionASTNodes,
    ]);
  }

  for (const field of fields) {
    // Ensure they are named correctly.
    validateName(context, field); // Ensure the type is an output type

    if (!isOutputType(field.type)) {
      var _field$astNode;

      context.reportError(
        `The type of ${type.name}.${field.name} must be Output Type ` +
          `but got: ${inspect$1(field.type)}.`,
        (_field$astNode = field.astNode) === null || _field$astNode === void 0
          ? void 0
          : _field$astNode.type,
      );
    } // Ensure the arguments are valid

    for (const arg of field.args) {
      const argName = arg.name; // Ensure they are named correctly.

      validateName(context, arg); // Ensure the type is an input type

      if (!isInputType(arg.type)) {
        var _arg$astNode2;

        context.reportError(
          `The type of ${type.name}.${field.name}(${argName}:) must be Input ` +
            `Type but got: ${inspect$1(arg.type)}.`,
          (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0
            ? void 0
            : _arg$astNode2.type,
        );
      }

      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;

        context.reportError(
          `Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0
              ? void 0
              : _arg$astNode3.type,
          ],
        );
      }
    }
  }
}

function validateInterfaces(context, type) {
  const ifaceTypeNames = Object.create(null);

  for (const iface of type.getInterfaces()) {
    if (!isInterfaceType(iface)) {
      context.reportError(
        `Type ${inspect$1(type)} must only implement Interface types, ` +
          `it cannot implement ${inspect$1(iface)}.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    if (type === iface) {
      context.reportError(
        `Type ${type.name} cannot implement itself because it would create a circular reference.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    if (ifaceTypeNames[iface.name]) {
      context.reportError(
        `Type ${type.name} can only implement ${iface.name} once.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context, type, iface);
    validateTypeImplementsInterface(context, type, iface);
  }
}

function validateTypeImplementsInterface(context, type, iface) {
  const typeFieldMap = type.getFields(); // Assert each interface field is implemented.

  for (const ifaceField of Object.values(iface.getFields())) {
    const fieldName = ifaceField.name;
    const typeField = typeFieldMap[fieldName]; // Assert interface field exists on type.

    if (!typeField) {
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`,
        [ifaceField.astNode, type.astNode, ...type.extensionASTNodes],
      );
      continue;
    } // Assert interface field type is satisfied by type field type, by being
    // a valid subtype. (covariant)

    if (!isTypeSubTypeOf(context.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;

      context.reportError(
        `Interface field ${iface.name}.${fieldName} expects type ` +
          `${inspect$1(ifaceField.type)} but ${type.name}.${fieldName} ` +
          `is type ${inspect$1(typeField.type)}.`,
        [
          (_ifaceField$astNode = ifaceField.astNode) === null ||
          _ifaceField$astNode === void 0
            ? void 0
            : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null ||
          _typeField$astNode === void 0
            ? void 0
            : _typeField$astNode.type,
        ],
      );
    } // Assert each interface field arg is implemented.

    for (const ifaceArg of ifaceField.args) {
      const argName = ifaceArg.name;
      const typeArg = typeField.args.find((arg) => arg.name === argName); // Assert interface field arg exists on object field.

      if (!typeArg) {
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`,
          [ifaceArg.astNode, typeField.astNode],
        );
        continue;
      } // Assert interface field arg type matches object field arg type.
      // (invariant)
      // TODO: change to contravariant?

      if (!isEqualType(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;

        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) ` +
            `expects type ${inspect$1(ifaceArg.type)} but ` +
            `${type.name}.${fieldName}(${argName}:) is type ` +
            `${inspect$1(typeArg.type)}.`,
          [
            (_ifaceArg$astNode = ifaceArg.astNode) === null ||
            _ifaceArg$astNode === void 0
              ? void 0
              : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null ||
            _typeArg$astNode === void 0
              ? void 0
              : _typeArg$astNode.type,
          ],
        );
      } // TODO: validate default values?
    } // Assert additional arguments must not be required.

    for (const typeArg of typeField.args) {
      const argName = typeArg.name;
      const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);

      if (!ifaceArg && isRequiredArgument(typeArg)) {
        context.reportError(
          `Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`,
          [typeArg.astNode, ifaceField.astNode],
        );
      }
    }
  }
}

function validateTypeImplementsAncestors(context, type, iface) {
  const ifaceInterfaces = type.getInterfaces();

  for (const transitive of iface.getInterfaces()) {
    if (!ifaceInterfaces.includes(transitive)) {
      context.reportError(
        transitive === type
          ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.`
          : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`,
        [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface),
        ],
      );
    }
  }
}

function validateUnionMembers(context, union) {
  const memberTypes = union.getTypes();

  if (memberTypes.length === 0) {
    context.reportError(
      `Union type ${union.name} must define one or more member types.`,
      [union.astNode, ...union.extensionASTNodes],
    );
  }

  const includedTypeNames = Object.create(null);

  for (const memberType of memberTypes) {
    if (includedTypeNames[memberType.name]) {
      context.reportError(
        `Union type ${union.name} can only include type ${memberType.name} once.`,
        getUnionMemberTypeNodes(union, memberType.name),
      );
      continue;
    }

    includedTypeNames[memberType.name] = true;

    if (!isObjectType(memberType)) {
      context.reportError(
        `Union type ${union.name} can only include Object types, ` +
          `it cannot include ${inspect$1(memberType)}.`,
        getUnionMemberTypeNodes(union, String(memberType)),
      );
    }
  }
}

function validateEnumValues(context, enumType) {
  const enumValues = enumType.getValues();

  if (enumValues.length === 0) {
    context.reportError(
      `Enum type ${enumType.name} must define one or more values.`,
      [enumType.astNode, ...enumType.extensionASTNodes],
    );
  }

  for (const enumValue of enumValues) {
    // Ensure valid name.
    validateName(context, enumValue);
  }
}

function validateInputFields(context, inputObj) {
  const fields = Object.values(inputObj.getFields());

  if (fields.length === 0) {
    context.reportError(
      `Input Object type ${inputObj.name} must define one or more fields.`,
      [inputObj.astNode, ...inputObj.extensionASTNodes],
    );
  } // Ensure the arguments are valid

  for (const field of fields) {
    // Ensure they are named correctly.
    validateName(context, field); // Ensure the type is an input type

    if (!isInputType(field.type)) {
      var _field$astNode2;

      context.reportError(
        `The type of ${inputObj.name}.${field.name} must be Input Type ` +
          `but got: ${inspect$1(field.type)}.`,
        (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0
          ? void 0
          : _field$astNode2.type,
      );
    }

    if (isRequiredInputField(field) && field.deprecationReason != null) {
      var _field$astNode3;

      context.reportError(
        `Required input field ${inputObj.name}.${field.name} cannot be deprecated.`,
        [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null ||
          _field$astNode3 === void 0
            ? void 0
            : _field$astNode3.type,
        ],
      );
    }
  }
}

function createInputObjectCircularRefsValidator(context) {
  // Modified copy of algorithm from 'src/validation/rules/NoFragmentCycles.js'.
  // Tracks already visited types to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  const visitedTypes = Object.create(null); // Array of types nodes used to produce meaningful errors

  const fieldPath = []; // Position in the type path

  const fieldPathIndexByTypeName = Object.create(null);
  return detectCycleRecursive; // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.

  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }

    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    const fields = Object.values(inputObj.getFields());

    for (const field of fields) {
      if (isNonNullType(field.type) && isInputObjectType(field.type.ofType)) {
        const fieldType = field.type.ofType;
        const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);

        if (cycleIndex === undefined) {
          detectCycleRecursive(fieldType);
        } else {
          const cyclePath = fieldPath.slice(cycleIndex);
          const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join('.');
          context.reportError(
            `Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`,
            cyclePath.map((fieldObj) => fieldObj.astNode),
          );
        }

        fieldPath.pop();
      }
    }

    fieldPathIndexByTypeName[inputObj.name] = undefined;
  }
}

function getAllImplementsInterfaceNodes(type, iface) {
  const { astNode, extensionASTNodes } = type;
  const nodes =
    astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  return nodes
    .flatMap((typeNode) => {
      var _typeNode$interfaces;

      return (
        /* c8 ignore next */
        (_typeNode$interfaces = typeNode.interfaces) !== null &&
          _typeNode$interfaces !== void 0
          ? _typeNode$interfaces
          : []
      );
    })
    .filter((ifaceNode) => ifaceNode.name.value === iface.name);
}

function getUnionMemberTypeNodes(union, typeName) {
  const { astNode, extensionASTNodes } = union;
  const nodes =
    astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  return nodes
    .flatMap((unionNode) => {
      var _unionNode$types;

      return (
        /* c8 ignore next */
        (_unionNode$types = unionNode.types) !== null &&
          _unionNode$types !== void 0
          ? _unionNode$types
          : []
      );
    })
    .filter((typeNode) => typeNode.name.value === typeName);
}

function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;

  return definitionNode === null || definitionNode === void 0
    ? void 0
    : (_definitionNode$direc = definitionNode.directives) === null ||
      _definitionNode$direc === void 0
    ? void 0
    : _definitionNode$direc.find(
        (node) => node.name.value === GraphQLDeprecatedDirective.name,
      );
}

function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLList(innerType);
    }

    case Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLNonNull(innerType);
    }

    case Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}

/**
 * TypeInfo is a utility class which, given a GraphQL schema, can keep track
 * of the current field and type definitions at any point in a GraphQL document
 * AST during a recursive descent by calling `enter(node)` and `leave(node)`.
 */

class TypeInfo {
  constructor(
    schema,
    /**
     * Initial type may be provided in rare cases to facilitate traversals
     *  beginning somewhere other than documents.
     */
    initialType,
    /** @deprecated will be removed in 17.0.0 */
    getFieldDefFn,
  ) {
    this._schema = schema;
    this._typeStack = [];
    this._parentTypeStack = [];
    this._inputTypeStack = [];
    this._fieldDefStack = [];
    this._defaultValueStack = [];
    this._directive = null;
    this._argument = null;
    this._enumValue = null;
    this._getFieldDef =
      getFieldDefFn !== null && getFieldDefFn !== void 0
        ? getFieldDefFn
        : getFieldDef$1;

    if (initialType) {
      if (isInputType(initialType)) {
        this._inputTypeStack.push(initialType);
      }

      if (isCompositeType(initialType)) {
        this._parentTypeStack.push(initialType);
      }

      if (isOutputType(initialType)) {
        this._typeStack.push(initialType);
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'TypeInfo';
  }

  getType() {
    if (this._typeStack.length > 0) {
      return this._typeStack[this._typeStack.length - 1];
    }
  }

  getParentType() {
    if (this._parentTypeStack.length > 0) {
      return this._parentTypeStack[this._parentTypeStack.length - 1];
    }
  }

  getInputType() {
    if (this._inputTypeStack.length > 0) {
      return this._inputTypeStack[this._inputTypeStack.length - 1];
    }
  }

  getParentInputType() {
    if (this._inputTypeStack.length > 1) {
      return this._inputTypeStack[this._inputTypeStack.length - 2];
    }
  }

  getFieldDef() {
    if (this._fieldDefStack.length > 0) {
      return this._fieldDefStack[this._fieldDefStack.length - 1];
    }
  }

  getDefaultValue() {
    if (this._defaultValueStack.length > 0) {
      return this._defaultValueStack[this._defaultValueStack.length - 1];
    }
  }

  getDirective() {
    return this._directive;
  }

  getArgument() {
    return this._argument;
  }

  getEnumValue() {
    return this._enumValue;
  }

  enter(node) {
    const schema = this._schema; // Note: many of the types below are explicitly typed as "unknown" to drop
    // any assumptions of a valid schema to ensure runtime types are properly
    // checked before continuing since TypeInfo is used as part of validation
    // which occurs before guarantees of schema and document validity.

    switch (node.kind) {
      case Kind.SELECTION_SET: {
        const namedType = getNamedType(this.getType());

        this._parentTypeStack.push(
          isCompositeType(namedType) ? namedType : undefined,
        );

        break;
      }

      case Kind.FIELD: {
        const parentType = this.getParentType();
        let fieldDef;
        let fieldType;

        if (parentType) {
          fieldDef = this._getFieldDef(schema, parentType, node);

          if (fieldDef) {
            fieldType = fieldDef.type;
          }
        }

        this._fieldDefStack.push(fieldDef);

        this._typeStack.push(isOutputType(fieldType) ? fieldType : undefined);

        break;
      }

      case Kind.DIRECTIVE:
        this._directive = schema.getDirective(node.name.value);
        break;

      case Kind.OPERATION_DEFINITION: {
        const rootType = schema.getRootType(node.operation);

        this._typeStack.push(isObjectType(rootType) ? rootType : undefined);

        break;
      }

      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION: {
        const typeConditionAST = node.typeCondition;
        const outputType = typeConditionAST
          ? typeFromAST(schema, typeConditionAST)
          : getNamedType(this.getType());

        this._typeStack.push(isOutputType(outputType) ? outputType : undefined);

        break;
      }

      case Kind.VARIABLE_DEFINITION: {
        const inputType = typeFromAST(schema, node.type);

        this._inputTypeStack.push(
          isInputType(inputType) ? inputType : undefined,
        );

        break;
      }

      case Kind.ARGUMENT: {
        var _this$getDirective;

        let argDef;
        let argType;
        const fieldOrDirective =
          (_this$getDirective = this.getDirective()) !== null &&
          _this$getDirective !== void 0
            ? _this$getDirective
            : this.getFieldDef();

        if (fieldOrDirective) {
          argDef = fieldOrDirective.args.find(
            (arg) => arg.name === node.name.value,
          );

          if (argDef) {
            argType = argDef.type;
          }
        }

        this._argument = argDef;

        this._defaultValueStack.push(argDef ? argDef.defaultValue : undefined);

        this._inputTypeStack.push(isInputType(argType) ? argType : undefined);

        break;
      }

      case Kind.LIST: {
        const listType = getNullableType(this.getInputType());
        const itemType = isListType(listType) ? listType.ofType : listType; // List positions never have a default value.

        this._defaultValueStack.push(undefined);

        this._inputTypeStack.push(isInputType(itemType) ? itemType : undefined);

        break;
      }

      case Kind.OBJECT_FIELD: {
        const objectType = getNamedType(this.getInputType());
        let inputFieldType;
        let inputField;

        if (isInputObjectType(objectType)) {
          inputField = objectType.getFields()[node.name.value];

          if (inputField) {
            inputFieldType = inputField.type;
          }
        }

        this._defaultValueStack.push(
          inputField ? inputField.defaultValue : undefined,
        );

        this._inputTypeStack.push(
          isInputType(inputFieldType) ? inputFieldType : undefined,
        );

        break;
      }

      case Kind.ENUM: {
        const enumType = getNamedType(this.getInputType());
        let enumValue;

        if (isEnumType(enumType)) {
          enumValue = enumType.getValue(node.value);
        }

        this._enumValue = enumValue;
        break;
      }
    }
  }

  leave(node) {
    switch (node.kind) {
      case Kind.SELECTION_SET:
        this._parentTypeStack.pop();

        break;

      case Kind.FIELD:
        this._fieldDefStack.pop();

        this._typeStack.pop();

        break;

      case Kind.DIRECTIVE:
        this._directive = null;
        break;

      case Kind.OPERATION_DEFINITION:
      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION:
        this._typeStack.pop();

        break;

      case Kind.VARIABLE_DEFINITION:
        this._inputTypeStack.pop();

        break;

      case Kind.ARGUMENT:
        this._argument = null;

        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case Kind.LIST:
      case Kind.OBJECT_FIELD:
        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case Kind.ENUM:
        this._enumValue = null;
        break;
    }
  }
}

/**
 * Not exactly the same as the executor's definition of getFieldDef, in this
 * statically evaluated environment we do not always have an Object type,
 * and need to handle Interface and Union types.
 */
function getFieldDef$1(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;

  if (
    name === SchemaMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return SchemaMetaFieldDef;
  }

  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }

  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }

  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */

function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = getEnterLeaveForKind(visitor, node.kind).enter;

      if (fn) {
        const result = fn.apply(visitor, args);

        if (result !== undefined) {
          typeInfo.leave(node);

          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }

        return result;
      }
    },

    leave(...args) {
      const node = args[0];
      const fn = getEnterLeaveForKind(visitor, node.kind).leave;
      let result;

      if (fn) {
        result = fn.apply(visitor, args);
      }

      typeInfo.leave(node);
      return result;
    },
  };
}

function isDefinitionNode(node) {
  return (
    isExecutableDefinitionNode(node) ||
    isTypeSystemDefinitionNode(node) ||
    isTypeSystemExtensionNode(node)
  );
}
function isExecutableDefinitionNode(node) {
  return (
    node.kind === Kind.OPERATION_DEFINITION ||
    node.kind === Kind.FRAGMENT_DEFINITION
  );
}
function isTypeSystemDefinitionNode(node) {
  return (
    node.kind === Kind.SCHEMA_DEFINITION ||
    isTypeDefinitionNode(node) ||
    node.kind === Kind.DIRECTIVE_DEFINITION
  );
}
function isTypeDefinitionNode(node) {
  return (
    node.kind === Kind.SCALAR_TYPE_DEFINITION ||
    node.kind === Kind.OBJECT_TYPE_DEFINITION ||
    node.kind === Kind.INTERFACE_TYPE_DEFINITION ||
    node.kind === Kind.UNION_TYPE_DEFINITION ||
    node.kind === Kind.ENUM_TYPE_DEFINITION ||
    node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
  );
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return (
    node.kind === Kind.SCALAR_TYPE_EXTENSION ||
    node.kind === Kind.OBJECT_TYPE_EXTENSION ||
    node.kind === Kind.INTERFACE_TYPE_EXTENSION ||
    node.kind === Kind.UNION_TYPE_EXTENSION ||
    node.kind === Kind.ENUM_TYPE_EXTENSION ||
    node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
  );
}

/**
 * Executable definitions
 *
 * A GraphQL document is only valid for execution if all definitions are either
 * operation or fragment definitions.
 *
 * See https://spec.graphql.org/draft/#sec-Executable-Definitions
 */
function ExecutableDefinitionsRule(context) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          const defName =
            definition.kind === Kind.SCHEMA_DEFINITION ||
            definition.kind === Kind.SCHEMA_EXTENSION
              ? 'schema'
              : '"' + definition.name.value + '"';
          context.reportError(
            new GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition,
            }),
          );
        }
      }

      return false;
    },
  };
}

/**
 * Fields on correct type
 *
 * A GraphQL document is only valid if all fields selected are defined by the
 * parent type, or are an allowed meta field such as __typename.
 *
 * See https://spec.graphql.org/draft/#sec-Field-Selections
 */
function FieldsOnCorrectTypeRule(context) {
  return {
    Field(node) {
      const type = context.getParentType();

      if (type) {
        const fieldDef = context.getFieldDef();

        if (!fieldDef) {
          // This field doesn't exist, lets look for suggestions.
          const schema = context.getSchema();
          const fieldName = node.name.value; // First determine if there are any suggested types to condition on.

          let suggestion = didYouMean(
            'to use an inline fragment on',
            getSuggestedTypeNames(schema, type, fieldName),
          ); // If there are no suggested types, then perhaps this was a typo?

          if (suggestion === '') {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          } // Report an error, including helpful suggestions.

          context.reportError(
            new GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` +
                suggestion,
              {
                nodes: node,
              },
            ),
          );
        }
      }
    },
  };
}
/**
 * Go through all of the implementations of type, as well as the interfaces that
 * they implement. If any of those types include the provided field, suggest them,
 * sorted by how often the type is referenced.
 */

function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    // Must be an Object type, which does not have possible fields.
    return [];
  }

  const suggestedTypes = new Set();
  const usageCount = Object.create(null);

  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    } // This object type defines this field.

    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;

    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;

      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      } // This interface type defines this field.

      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] =
        ((_usageCount$possibleI = usageCount[possibleInterface.name]) !==
          null && _usageCount$possibleI !== void 0
          ? _usageCount$possibleI
          : 0) + 1;
    }
  }

  return [...suggestedTypes]
    .sort((typeA, typeB) => {
      // Suggest both interface and object types based on how common they are.
      const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];

      if (usageCountDiff !== 0) {
        return usageCountDiff;
      } // Suggest super types first followed by subtypes

      if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
        return -1;
      }

      if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
        return 1;
      }

      return naturalCompare(typeA.name, typeB.name);
    })
    .map((x) => x.name);
}
/**
 * For the field name provided, determine if there are any similar field names
 * that may be the result of a typo.
 */

function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  } // Otherwise, must be a Union type, which does not define fields.

  return [];
}

/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 *
 * See https://spec.graphql.org/draft/#sec-Fragments-On-Composite-Types
 */
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;

      if (typeCondition) {
        const type = typeFromAST(context.getSchema(), typeCondition);

        if (type && !isCompositeType(type)) {
          const typeStr = print(typeCondition);
          context.reportError(
            new GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              {
                nodes: typeCondition,
              },
            ),
          );
        }
      }
    },

    FragmentDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.typeCondition);

      if (type && !isCompositeType(type)) {
        const typeStr = print(node.typeCondition);
        context.reportError(
          new GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            {
              nodes: node.typeCondition,
            },
          ),
        );
      }
    },
  };
}

/**
 * Known argument names
 *
 * A GraphQL field is only valid if all supplied arguments are defined by
 * that field.
 *
 * See https://spec.graphql.org/draft/#sec-Argument-Names
 * See https://spec.graphql.org/draft/#sec-Directives-Are-In-Valid-Locations
 */
function KnownArgumentNamesRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...KnownArgumentNamesOnDirectivesRule(context),

    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();

      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(
          new GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` +
              didYouMean(suggestions),
            {
              nodes: argNode,
            },
          ),
        );
      }
    },
  };
}
/**
 * @internal
 */

function KnownArgumentNamesOnDirectivesRule(context) {
  const directiveArgs = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;

  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argsNodes =
        (_def$arguments = def.arguments) !== null && _def$arguments !== void 0
          ? _def$arguments
          : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }

  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];

      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;

          if (!knownArgs.includes(argName)) {
            const suggestions = suggestionList(argName, knownArgs);
            context.reportError(
              new GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` +
                  didYouMean(suggestions),
                {
                  nodes: argNode,
                },
              ),
            );
          }
        }
      }

      return false;
    },
  };
}

/**
 * Known directives
 *
 * A GraphQL document is only valid if all `@directives` are known by the
 * schema and legally positioned.
 *
 * See https://spec.graphql.org/draft/#sec-Directives-Are-Defined
 */
function KnownDirectivesRule(context) {
  const locationsMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;

  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }

  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];

      if (!locations) {
        context.reportError(
          new GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node,
          }),
        );
        return;
      }

      const candidateLocation = getDirectiveLocationForASTPath(ancestors);

      if (candidateLocation && !locations.includes(candidateLocation)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            {
              nodes: node,
            },
          ),
        );
      }
    },
  };
}

function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  'kind' in appliedTo || invariant$1(false);

  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);

    case Kind.FIELD:
      return DirectiveLocation$1.FIELD;

    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation$1.FRAGMENT_SPREAD;

    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation$1.INLINE_FRAGMENT;

    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation$1.FRAGMENT_DEFINITION;

    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation$1.VARIABLE_DEFINITION;

    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation$1.SCHEMA;

    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation$1.SCALAR;

    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation$1.OBJECT;

    case Kind.FIELD_DEFINITION:
      return DirectiveLocation$1.FIELD_DEFINITION;

    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation$1.INTERFACE;

    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation$1.UNION;

    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation$1.ENUM;

    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation$1.ENUM_VALUE;

    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation$1.INPUT_OBJECT;

    case Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      'kind' in parentNode || invariant$1(false);
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
        ? DirectiveLocation$1.INPUT_FIELD_DEFINITION
        : DirectiveLocation$1.ARGUMENT_DEFINITION;
    }
    // Not reachable, all possible types have been considered.

    /* c8 ignore next */

    default:
      invariant$1(false, 'Unexpected kind: ' + inspect$1(appliedTo.kind));
  }
}

function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case OperationTypeNode.QUERY:
      return DirectiveLocation$1.QUERY;

    case OperationTypeNode.MUTATION:
      return DirectiveLocation$1.MUTATION;

    case OperationTypeNode.SUBSCRIPTION:
      return DirectiveLocation$1.SUBSCRIPTION;
  }
}

/**
 * Known fragment names
 *
 * A GraphQL document is only valid if all `...Fragment` fragment spreads refer
 * to fragments defined in the same document.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-spread-target-defined
 */
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context.getFragment(fragmentName);

      if (!fragment) {
        context.reportError(
          new GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name,
          }),
        );
      }
    },
  };
}

/**
 * Known type names
 *
 * A GraphQL document is only valid if referenced types (specifically
 * variable definitions and fragment conditions) are defined by the type schema.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-Spread-Type-Existence
 */
function KnownTypeNamesRule(context) {
  const schema = context.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : Object.create(null);
  const definedTypes = Object.create(null);

  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }

  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes),
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;

      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;

        const definitionNode =
          (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0
            ? _ancestors$
            : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);

        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }

        const suggestedTypes = suggestionList(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames,
        );
        context.reportError(
          new GraphQLError(
            `Unknown type "${typeName}".` + didYouMean(suggestedTypes),
            {
              nodes: node,
            },
          ),
        );
      }
    },
  };
}
const standardTypeNames = [...specifiedScalarTypes, ...introspectionTypes].map(
  (type) => type.name,
);

function isSDLNode(value) {
  return (
    'kind' in value &&
    (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value))
  );
}

/**
 * Lone anonymous operation
 *
 * A GraphQL document is only valid if when it contains an anonymous operation
 * (the query short-hand) that it contains only that one operation definition.
 *
 * See https://spec.graphql.org/draft/#sec-Lone-Anonymous-Operation
 */
function LoneAnonymousOperationRule(context) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION,
      ).length;
    },

    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(
          new GraphQLError(
            'This anonymous operation must be the only defined operation.',
            {
              nodes: node,
            },
          ),
        );
      }
    },
  };
}

/**
 * Lone Schema definition
 *
 * A GraphQL document is only valid if it contains only one schema definition.
 */
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;

  const oldSchema = context.getSchema();
  const alreadyDefined =
    (_ref =
      (_ref2 =
        (_oldSchema$astNode =
          oldSchema === null || oldSchema === void 0
            ? void 0
            : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0
          ? _oldSchema$astNode
          : oldSchema === null || oldSchema === void 0
          ? void 0
          : oldSchema.getQueryType()) !== null && _ref2 !== void 0
        ? _ref2
        : oldSchema === null || oldSchema === void 0
        ? void 0
        : oldSchema.getMutationType()) !== null && _ref !== void 0
      ? _ref
      : oldSchema === null || oldSchema === void 0
      ? void 0
      : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new GraphQLError(
            'Cannot define a new schema within a schema extension.',
            {
              nodes: node,
            },
          ),
        );
        return;
      }

      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new GraphQLError('Must provide only one schema definition.', {
            nodes: node,
          }),
        );
      }

      ++schemaDefinitionsCount;
    },
  };
}

/**
 * No fragment cycles
 *
 * The graph of fragment spreads must not form any cycles including spreading itself.
 * Otherwise an operation could infinitely spread or infinitely execute on cycles in the underlying data.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-spreads-must-not-form-cycles
 */
function NoFragmentCyclesRule(context) {
  // Tracks already visited fragments to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  const visitedFrags = Object.create(null); // Array of AST nodes used to produce meaningful errors

  const spreadPath = []; // Position in the spread path

  const spreadPathIndexByName = Object.create(null);
  return {
    OperationDefinition: () => false,

    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    },
  }; // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.

  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }

    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);

    if (spreadNodes.length === 0) {
      return;
    }

    spreadPathIndexByName[fragmentName] = spreadPath.length;

    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);

      if (cycleIndex === undefined) {
        const spreadFragment = context.getFragment(spreadName);

        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath
          .slice(0, -1)
          .map((s) => '"' + s.name.value + '"')
          .join(', ');
        context.reportError(
          new GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` +
              (viaPath !== '' ? ` via ${viaPath}.` : '.'),
            {
              nodes: cyclePath,
            },
          ),
        );
      }

      spreadPath.pop();
    }

    spreadPathIndexByName[fragmentName] = undefined;
  }
}

/**
 * No undefined variables
 *
 * A GraphQL operation is only valid if all variables encountered, both directly
 * and via fragment spreads, are defined by that operation.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variable-Uses-Defined
 */
function NoUndefinedVariablesRule(context) {
  let variableNameDefined = Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = Object.create(null);
      },

      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node } of usages) {
          const varName = node.name.value;

          if (variableNameDefined[varName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name
                  ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".`
                  : `Variable "$${varName}" is not defined.`,
                {
                  nodes: [node, operation],
                },
              ),
            );
          }
        }
      },
    },

    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    },
  };
}

/**
 * No unused fragments
 *
 * A GraphQL document is only valid if all fragment definitions are spread
 * within operations, or spread within other fragments spread within operations.
 *
 * See https://spec.graphql.org/draft/#sec-Fragments-Must-Be-Used
 */
function NoUnusedFragmentsRule(context) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },

    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },

    Document: {
      leave() {
        const fragmentNameUsed = Object.create(null);

        for (const operation of operationDefs) {
          for (const fragment of context.getRecursivelyReferencedFragments(
            operation,
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }

        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;

          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(
              new GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef,
              }),
            );
          }
        }
      },
    },
  };
}

/**
 * No unused variables
 *
 * A GraphQL operation is only valid if all variables defined by an operation
 * are used, either directly or within a spread fragment.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variables-Used
 */
function NoUnusedVariablesRule(context) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },

      leave(operation) {
        const variableNameUsed = Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }

        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;

          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name
                  ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".`
                  : `Variable "$${variableName}" is never used.`,
                {
                  nodes: variableDef,
                },
              ),
            );
          }
        }
      },
    },

    VariableDefinition(def) {
      variableDefs.push(def);
    },
  };
}

/**
 * Sort ValueNode.
 *
 * This function returns a sorted copy of the given ValueNode.
 *
 * @internal
 */

function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };

    case Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };

    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.NULL:
    case Kind.ENUM:
    case Kind.VARIABLE:
      return valueNode;
  }
}

function sortFields(fields) {
  return fields
    .map((fieldNode) => ({
      ...fieldNode,
      value: sortValueNode(fieldNode.value),
    }))
    .sort((fieldA, fieldB) =>
      naturalCompare(fieldA.name.value, fieldB.name.value),
    );
}

function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason
      .map(
        ([responseName, subReason]) =>
          `subfields "${responseName}" conflict because ` +
          reasonMessage(subReason),
      )
      .join(' and ');
  }

  return reason;
}
/**
 * Overlapping fields can be merged
 *
 * A selection set is only valid if all fields (including spreading any
 * fragments) either correspond to distinct response names or can be merged
 * without ambiguity.
 *
 * See https://spec.graphql.org/draft/#sec-Field-Selection-Merging
 */

function OverlappingFieldsCanBeMergedRule(context) {
  // A memoization for when two fragments are compared "between" each other for
  // conflicts. Two fragments may be compared many times, so memoizing this can
  // dramatically improve the performance of this validator.
  const comparedFragmentPairs = new PairSet(); // A cache for the "field map" and list of fragment names found in any given
  // selection set. Selection sets may be asked for this information multiple
  // times, so this improves the performance of this validator.

  const cachedFieldsAndFragmentNames = new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        context.getParentType(),
        selectionSet,
      );

      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context.reportError(
          new GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            {
              nodes: fields1.concat(fields2),
            },
          ),
        );
      }
    },
  };
}

/**
 * Algorithm:
 *
 * Conflicts occur when two fields exist in a query which will produce the same
 * response name, but represent differing values, thus creating a conflict.
 * The algorithm below finds all conflicts via making a series of comparisons
 * between fields. In order to compare as few fields as possible, this makes
 * a series of comparisons "within" sets of fields and "between" sets of fields.
 *
 * Given any selection set, a collection produces both a set of fields by
 * also including all inline fragments, as well as a list of fragments
 * referenced by fragment spreads.
 *
 * A) Each selection set represented in the document first compares "within" its
 * collected set of fields, finding any conflicts between every pair of
 * overlapping fields.
 * Note: This is the *only time* that a the fields "within" a set are compared
 * to each other. After this only fields "between" sets are compared.
 *
 * B) Also, if any fragment is referenced in a selection set, then a
 * comparison is made "between" the original set of fields and the
 * referenced fragment.
 *
 * C) Also, if multiple fragments are referenced, then comparisons
 * are made "between" each referenced fragment.
 *
 * D) When comparing "between" a set of fields and a referenced fragment, first
 * a comparison is made between each field in the original set of fields and
 * each field in the the referenced set of fields.
 *
 * E) Also, if any fragment is referenced in the referenced selection set,
 * then a comparison is made "between" the original set of fields and the
 * referenced fragment (recursively referring to step D).
 *
 * F) When comparing "between" two fragments, first a comparison is made between
 * each field in the first referenced set of fields and each field in the the
 * second referenced set of fields.
 *
 * G) Also, any fragments referenced by the first must be compared to the
 * second, and any fragments referenced by the second must be compared to the
 * first (recursively referring to step F).
 *
 * H) When comparing two fields, if both have selection sets, then a comparison
 * is made "between" both selection sets, first comparing the set of fields in
 * the first selection set with the set of fields in the second.
 *
 * I) Also, if any fragment is referenced in either selection set, then a
 * comparison is made "between" the other set of fields and the
 * referenced fragment.
 *
 * J) Also, if two fragments are referenced in both selection sets, then a
 * comparison is made "between" the two fragments.
 *
 */
// Find all conflicts found "within" a selection set, including those found
// via spreading in fragments. Called when visiting each SelectionSet in the
// GraphQL Document.
function findConflictsWithinSelectionSet(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentType,
  selectionSet,
) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet,
  ); // (A) Find find all conflicts "within" the fields of this selection set.
  // Note: this is the *only place* `collectConflictsWithin` is called.

  collectConflictsWithin(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    fieldMap,
  );

  if (fragmentNames.length !== 0) {
    // (B) Then collect conflicts between these fields and those represented by
    // each spread fragment name found.
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i],
      ); // (C) Then compare this fragment with all other fragments found in this
      // selection set to collect conflicts between fragments spread together.
      // This compares each item in the list of fragment names to every other
      // item in that same list (except for itself).

      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j],
        );
      }
    }
  }

  return conflicts;
} // Collect all conflicts found between a set of fields and a fragment reference
// including via spreading in any nested fragments.

function collectConflictsBetweenFieldsAndFragment(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  fieldMap,
  fragmentName,
) {
  const fragment = context.getFragment(fragmentName);

  if (!fragment) {
    return;
  }

  const [fieldMap2, referencedFragmentNames] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment,
    ); // Do not compare a fragment's fieldMap to itself.

  if (fieldMap === fieldMap2) {
    return;
  } // (D) First collect any conflicts between the provided collection of fields
  // and the collection of fields represented by the given fragment.

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2,
  ); // (E) Then collect any conflicts between the provided collection of fields
  // and any fragment names found in the given fragment.

  for (const referencedFragmentName of referencedFragmentNames) {
    // Memoize so two fragments are not compared for conflicts more than once.
    if (
      comparedFragmentPairs.has(
        referencedFragmentName,
        fragmentName,
        areMutuallyExclusive,
      )
    ) {
      continue;
    }

    comparedFragmentPairs.add(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive,
    );
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName,
    );
  }
} // Collect all conflicts found between two fragments, including via spreading in
// any nested fragments.

function collectConflictsBetweenFragments(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  fragmentName1,
  fragmentName2,
) {
  // No need to compare a fragment to itself.
  if (fragmentName1 === fragmentName2) {
    return;
  } // Memoize so two fragments are not compared for conflicts more than once.

  if (
    comparedFragmentPairs.has(
      fragmentName1,
      fragmentName2,
      areMutuallyExclusive,
    )
  ) {
    return;
  }

  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context.getFragment(fragmentName1);
  const fragment2 = context.getFragment(fragmentName2);

  if (!fragment1 || !fragment2) {
    return;
  }

  const [fieldMap1, referencedFragmentNames1] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment1,
    );
  const [fieldMap2, referencedFragmentNames2] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment2,
    ); // (F) First, collect all conflicts between these two collections of fields
  // (not including any nested fragments).

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2,
  ); // (G) Then collect conflicts between the first fragment and any nested
  // fragments spread in the second fragment.

  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2,
    );
  } // (G) Then collect conflicts between the second fragment and any nested
  // fragments spread in the first fragment.

  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2,
    );
  }
} // Find all conflicts found between two selection sets, including those found
// via spreading in fragments. Called when determining if conflicts exist
// between the sub-fields of two overlapping fields.

function findConflictsBetweenSubSelectionSets(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  parentType1,
  selectionSet1,
  parentType2,
  selectionSet2,
) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1,
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2,
  ); // (H) First, collect all conflicts between these two collections of field.

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2,
  ); // (I) Then collect conflicts between the first collection of fields and
  // those referenced by each fragment name associated with the second.

  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2,
    );
  } // (I) Then collect conflicts between the second collection of fields and
  // those referenced by each fragment name associated with the first.

  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1,
    );
  } // (J) Also collect conflicts between any fragment names by the first and
  // fragment names by the second. This compares each item in the first set of
  // names to each item in the second set of names.

  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2,
      );
    }
  }

  return conflicts;
} // Collect all Conflicts "within" one collection of fields.

function collectConflictsWithin(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  fieldMap,
) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For every response name, if there are multiple fields, they
  // must be compared to find a potential conflict.
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    // This compares every field in the list to every other field in this list
    // (except to itself). If the list only has one item, nothing needs to
    // be compared.
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            false, // within one collection is never mutually exclusive
            responseName,
            fields[i],
            fields[j],
          );

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Collect all Conflicts between two collections of fields. This is similar to,
// but different from the `collectConflictsWithin` function above. This check
// assumes that `collectConflictsWithin` has already been called on each
// provided collection of fields. This is true because this validator traverses
// each individual selection set.

function collectConflictsBetween(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentFieldsAreMutuallyExclusive,
  fieldMap1,
  fieldMap2,
) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For any response name which appears in both provided field
  // maps, each field from the first field map must be compared to every field
  // in the second field map to find potential conflicts.
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];

    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2,
          );

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Determines if there is a conflict between two particular fields, including
// comparing their sub-fields.

function findConflict(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentFieldsAreMutuallyExclusive,
  responseName,
  field1,
  field2,
) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2; // If it is known that two fields could not possibly apply at the same
  // time, due to the parent types, then it is safe to permit them to diverge
  // in aliased field or arguments used as they will not present any ambiguity
  // by differing.
  // It is known that two parent types could never overlap if they are
  // different Object types. Interface or Union types might overlap - if not
  // in the current state of the schema, then perhaps in some future version,
  // thus may not safely diverge.

  const areMutuallyExclusive =
    parentFieldsAreMutuallyExclusive ||
    (parentType1 !== parentType2 &&
      isObjectType(parentType1) &&
      isObjectType(parentType2));

  if (!areMutuallyExclusive) {
    // Two aliases must refer to the same field.
    const name1 = node1.name.value;
    const name2 = node2.name.value;

    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2],
      ];
    } // Two field calls must have the same arguments.

    if (stringifyArguments(node1) !== stringifyArguments(node2)) {
      return [
        [responseName, 'they have differing arguments'],
        [node1],
        [node2],
      ];
    }
  } // The return type for each field.

  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;

  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${inspect$1(type1)}" and "${inspect$1(
          type2,
        )}"`,
      ],
      [node1],
      [node2],
    ];
  } // Collect and compare sub-fields. Use the same "visited fragment names" list
  // for both collections so fields in a fragment reference are never
  // compared to themselves.

  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;

  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      getNamedType(type1),
      selectionSet1,
      getNamedType(type2),
      selectionSet2,
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}

function stringifyArguments(fieldNode) {
  var _fieldNode$arguments;

  // FIXME https://github.com/graphql/graphql-js/issues/2203
  const args =
    /* c8 ignore next */
    (_fieldNode$arguments = fieldNode.arguments) !== null &&
    _fieldNode$arguments !== void 0
      ? _fieldNode$arguments
      : [];
  const inputObjectWithArgs = {
    kind: Kind.OBJECT,
    fields: args.map((argNode) => ({
      kind: Kind.OBJECT_FIELD,
      name: argNode.name,
      value: argNode.value,
    })),
  };
  return print(sortValueNode(inputObjectWithArgs));
} // Two types conflict if both types could not apply to a value simultaneously.
// Composite types are ignored as their individual field types will be compared
// later recursively. However List and Non-Null types must match.

function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2)
      ? doTypesConflict(type1.ofType, type2.ofType)
      : true;
  }

  if (isListType(type2)) {
    return true;
  }

  if (isNonNullType(type1)) {
    return isNonNullType(type2)
      ? doTypesConflict(type1.ofType, type2.ofType)
      : true;
  }

  if (isNonNullType(type2)) {
    return true;
  }

  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }

  return false;
} // Given a selection set, return the collection of fields (a mapping of response
// name to field nodes and definitions) as well as a list of fragment names
// referenced via fragment spreads.

function getFieldsAndFragmentNames(
  context,
  cachedFieldsAndFragmentNames,
  parentType,
  selectionSet,
) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);

  if (cached) {
    return cached;
  }

  const nodeAndDefs = Object.create(null);
  const fragmentNames = Object.create(null);

  _collectFieldsAndFragmentNames(
    context,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames,
  );

  const result = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result);
  return result;
} // Given a reference to a fragment, return the represented collection of fields
// as well as a list of nested fragment names referenced via fragment spreads.

function getReferencedFieldsAndFragmentNames(
  context,
  cachedFieldsAndFragmentNames,
  fragment,
) {
  // Short-circuit building a type from the node if possible.
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);

  if (cached) {
    return cached;
  }

  const fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet,
  );
}

function _collectFieldsAndFragmentNames(
  context,
  parentType,
  selectionSet,
  nodeAndDefs,
  fragmentNames,
) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;

        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }

        const responseName = selection.alias
          ? selection.alias.value
          : fieldName;

        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }

        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }

      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;

      case Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition
          ? typeFromAST(context.getSchema(), typeCondition)
          : parentType;

        _collectFieldsAndFragmentNames(
          context,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames,
        );

        break;
      }
    }
  }
} // Given a series of Conflicts which occurred between two sub-fields, generate
// a single Conflict.

function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()],
    ];
  }
}
/**
 * A way to keep track of pairs of things when the ordering of the pair does not matter.
 */

class PairSet {
  constructor() {
    this._data = new Map();
  }

  has(a, b, areMutuallyExclusive) {
    var _this$_data$get;

    const [key1, key2] = a < b ? [a, b] : [b, a];
    const result =
      (_this$_data$get = this._data.get(key1)) === null ||
      _this$_data$get === void 0
        ? void 0
        : _this$_data$get.get(key2);

    if (result === undefined) {
      return false;
    } // areMutuallyExclusive being false is a superset of being true, hence if
    // we want to know if this PairSet "has" these two with no exclusivity,
    // we have to ensure it was added as such.

    return areMutuallyExclusive ? true : areMutuallyExclusive === result;
  }

  add(a, b, areMutuallyExclusive) {
    const [key1, key2] = a < b ? [a, b] : [b, a];

    const map = this._data.get(key1);

    if (map === undefined) {
      this._data.set(key1, new Map([[key2, areMutuallyExclusive]]));
    } else {
      map.set(key2, areMutuallyExclusive);
    }
  }
}

/**
 * Possible fragment spread
 *
 * A fragment spread is only valid if the type condition could ever possibly
 * be true: if there is a non-empty intersection of the possible parent types,
 * and possible types which pass the type condition.
 */
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();

      if (
        isCompositeType(fragType) &&
        isCompositeType(parentType) &&
        !doTypesOverlap(context.getSchema(), fragType, parentType)
      ) {
        const parentTypeStr = inspect$1(parentType);
        const fragTypeStr = inspect$1(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node,
            },
          ),
        );
      }
    },

    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();

      if (
        fragType &&
        parentType &&
        !doTypesOverlap(context.getSchema(), fragType, parentType)
      ) {
        const parentTypeStr = inspect$1(parentType);
        const fragTypeStr = inspect$1(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node,
            },
          ),
        );
      }
    },
  };
}

function getFragmentType(context, name) {
  const frag = context.getFragment(name);

  if (frag) {
    const type = typeFromAST(context.getSchema(), frag.typeCondition);

    if (isCompositeType(type)) {
      return type;
    }
  }
}

/**
 * Possible type extension
 *
 * A type extension is only valid if the type is defined and has the same kind.
 */
function PossibleTypeExtensionsRule(context) {
  const schema = context.getSchema();
  const definedTypes = Object.create(null);

  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }

  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension,
  };

  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType =
      schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;

    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }

    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context.reportError(
          new GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node,
          }),
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...(schema === null || schema === void 0
          ? void 0
          : schema.getTypeMap()),
      });
      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(
        new GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` +
            didYouMean(suggestedTypes),
          {
            nodes: node.name,
          },
        ),
      );
    }
  }
}
const defKindToExtKind = {
  [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
  [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
  [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
  [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
  [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
  [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION,
};

function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }

  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }

  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }

  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }

  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }

  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  /* c8 ignore next 3 */
  // Not reachable. All possible types have been considered

  invariant$1(false, 'Unexpected type: ' + inspect$1(type));
}

function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return 'scalar';

    case Kind.OBJECT_TYPE_EXTENSION:
      return 'object';

    case Kind.INTERFACE_TYPE_EXTENSION:
      return 'interface';

    case Kind.UNION_TYPE_EXTENSION:
      return 'union';

    case Kind.ENUM_TYPE_EXTENSION:
      return 'enum';

    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return 'input object';
    // Not reachable. All possible types have been considered

    /* c8 ignore next */

    default:
      invariant$1(false, 'Unexpected kind: ' + inspect$1(kind));
  }
}

/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null without a
 * default value) field arguments have been provided.
 */
function ProvidedRequiredArgumentsRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...ProvidedRequiredArgumentsOnDirectivesRule(context),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        var _fieldNode$arguments;

        const fieldDef = context.getFieldDef();

        if (!fieldDef) {
          return false;
        }

        const providedArgs = new Set( // FIXME: https://github.com/graphql/graphql-js/issues/2203
          /* c8 ignore next */
          (_fieldNode$arguments = fieldNode.arguments) === null ||
          _fieldNode$arguments === void 0
            ? void 0
            : _fieldNode$arguments.map((arg) => arg.name.value),
        );

        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && isRequiredArgument(argDef)) {
            const argTypeStr = inspect$1(argDef.type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                {
                  nodes: fieldNode,
                },
              ),
            );
          }
        }
      },
    },
  };
}
/**
 * @internal
 */

function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var _schema$getDirectives;

  const requiredArgsMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives =
    (_schema$getDirectives =
      schema === null || schema === void 0
        ? void 0
        : schema.getDirectives()) !== null && _schema$getDirectives !== void 0
      ? _schema$getDirectives
      : specifiedDirectives;

  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      (arg) => arg.name,
    );
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argNodes =
        (_def$arguments = def.arguments) !== null && _def$arguments !== void 0
          ? _def$arguments
          : [];
      requiredArgsMap[def.name.value] = keyMap(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value,
      );
    }
  }

  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];

        if (requiredArgs) {
          var _directiveNode$argume;

          // FIXME: https://github.com/graphql/graphql-js/issues/2203

          /* c8 ignore next */
          const argNodes =
            (_directiveNode$argume = directiveNode.arguments) !== null &&
            _directiveNode$argume !== void 0
              ? _directiveNode$argume
              : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));

          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = isType(argDef.type)
                ? inspect$1(argDef.type)
                : print(argDef.type);
              context.reportError(
                new GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  {
                    nodes: directiveNode,
                  },
                ),
              );
            }
          }
        }
      },
    },
  };
}

function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}

/**
 * Scalar leafs
 *
 * A GraphQL document is valid only if all leaf fields (fields without
 * sub selections) are of scalar or enum types.
 */
function ScalarLeafsRule(context) {
  return {
    Field(node) {
      const type = context.getType();
      const selectionSet = node.selectionSet;

      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = inspect$1(type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                {
                  nodes: selectionSet,
                },
              ),
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = inspect$1(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              {
                nodes: node,
              },
            ),
          );
        }
      }
    },
  };
}

/**
 * Build a string describing the path.
 */
function printPathArray(path) {
  return path
    .map((key) =>
      typeof key === 'number' ? '[' + key.toString() + ']' : '.' + key,
    )
    .join('');
}

/**
 * Given a Path and a key, return a new Path containing the new key.
 */
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename,
  };
}
/**
 * Given a Path, return an Array of the path keys.
 */

function pathToArray(path) {
  const flattened = [];
  let curr = path;

  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }

  return flattened.reverse();
}

/**
 * Coerces a JavaScript value given a GraphQL Input Type.
 */
function coerceInputValue(inputValue, type, onError = defaultOnError) {
  return coerceInputValueImpl(inputValue, type, onError, undefined);
}

function defaultOnError(path, invalidValue, error) {
  let errorPrefix = 'Invalid value ' + inspect$1(invalidValue);

  if (path.length > 0) {
    errorPrefix += ` at "value${printPathArray(path)}"`;
  }

  error.message = errorPrefix + ': ' + error.message;
  throw error;
}

function coerceInputValueImpl(inputValue, type, onError, path) {
  if (isNonNullType(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }

    onError(
      pathToArray(path),
      inputValue,
      new GraphQLError(
        `Expected non-nullable type "${inspect$1(type)}" not to be null.`,
      ),
    );
    return;
  }

  if (inputValue == null) {
    // Explicitly return the value null.
    return null;
  }

  if (isListType(type)) {
    const itemType = type.ofType;

    if (isIterableObject(inputValue)) {
      return Array.from(inputValue, (itemValue, index) => {
        const itemPath = addPath(path, index, undefined);
        return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
      });
    } // Lists accept a non-list value as a list of one.

    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }

  if (isInputObjectType(type)) {
    if (!isObjectLike(inputValue)) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}" to be an object.`),
      );
      return;
    }

    const coercedValue = {};
    const fieldDefs = type.getFields();

    for (const field of Object.values(fieldDefs)) {
      const fieldValue = inputValue[field.name];

      if (fieldValue === undefined) {
        if (field.defaultValue !== undefined) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          const typeStr = inspect$1(field.type);
          onError(
            pathToArray(path),
            inputValue,
            new GraphQLError(
              `Field "${field.name}" of required type "${typeStr}" was not provided.`,
            ),
          );
        }

        continue;
      }

      coercedValue[field.name] = coerceInputValueImpl(
        fieldValue,
        field.type,
        onError,
        addPath(path, field.name, type.name),
      );
    } // Ensure every provided field is defined.

    for (const fieldName of Object.keys(inputValue)) {
      if (!fieldDefs[fieldName]) {
        const suggestions = suggestionList(
          fieldName,
          Object.keys(type.getFields()),
        );
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(
            `Field "${fieldName}" is not defined by type "${type.name}".` +
              didYouMean(suggestions),
          ),
        );
      }
    }

    return coercedValue;
  }

  if (isLeafType(type)) {
    let parseResult; // Scalars and Enums determine if a input value is valid via parseValue(),
    // which can throw to indicate failure. If it throws, maintain a reference
    // to the original error.

    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof GraphQLError) {
        onError(pathToArray(path), inputValue, error);
      } else {
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(`Expected type "${type.name}". ` + error.message, {
            originalError: error,
          }),
        );
      }

      return;
    }

    if (parseResult === undefined) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}".`),
      );
    }

    return parseResult;
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

  invariant$1(false, 'Unexpected input type: ' + inspect$1(type));
}

/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * GraphQL Value literals.
 *
 * Returns `undefined` when the value could not be validly coerced according to
 * the provided type.
 *
 * | GraphQL Value        | JSON Value    |
 * | -------------------- | ------------- |
 * | Input Object         | Object        |
 * | List                 | Array         |
 * | Boolean              | Boolean       |
 * | String               | String        |
 * | Int / Float          | Number        |
 * | Enum Value           | Unknown       |
 * | NullValue            | null          |
 *
 */

function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    // When there is no node, then there is also no value.
    // Importantly, this is different from returning the value null.
    return;
  }

  if (valueNode.kind === Kind.VARIABLE) {
    const variableName = valueNode.name.value;

    if (variables == null || variables[variableName] === undefined) {
      // No valid return value.
      return;
    }

    const variableValue = variables[variableName];

    if (variableValue === null && isNonNullType(type)) {
      return; // Invalid: intentionally return no value.
    } // Note: This does no further checking that this variable is correct.
    // This assumes that this query has been validated and the variable
    // usage here is of the correct type.

    return variableValue;
  }

  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return; // Invalid: intentionally return no value.
    }

    return valueFromAST(valueNode, type.ofType, variables);
  }

  if (valueNode.kind === Kind.NULL) {
    // This is explicitly returning the value null.
    return null;
  }

  if (isListType(type)) {
    const itemType = type.ofType;

    if (valueNode.kind === Kind.LIST) {
      const coercedValues = [];

      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          // If an array contains a missing variable, it is either coerced to
          // null or if the item type is non-null, it considered invalid.
          if (isNonNullType(itemType)) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);

          if (itemValue === undefined) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(itemValue);
        }
      }

      return coercedValues;
    }

    const coercedValue = valueFromAST(valueNode, itemType, variables);

    if (coercedValue === undefined) {
      return; // Invalid: intentionally return no value.
    }

    return [coercedValue];
  }

  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return; // Invalid: intentionally return no value.
    }

    const coercedObj = Object.create(null);
    const fieldNodes = keyMap(valueNode.fields, (field) => field.name.value);

    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];

      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== undefined) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return; // Invalid: intentionally return no value.
        }

        continue;
      }

      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);

      if (fieldValue === undefined) {
        return; // Invalid: intentionally return no value.
      }

      coercedObj[field.name] = fieldValue;
    }

    return coercedObj;
  }

  if (isLeafType(type)) {
    // Scalars and Enums fulfill parsing a literal value via parseLiteral().
    // Invalid values represent a failure to parse correctly, in which case
    // no value is returned.
    let result;

    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return; // Invalid: intentionally return no value.
    }

    if (result === undefined) {
      return; // Invalid: intentionally return no value.
    }

    return result;
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible input types have been considered.

  invariant$1(false, 'Unexpected input type: ' + inspect$1(type));
} // Returns true if the provided valueNode is a variable which is not defined
// in the set of variables.

function isMissingVariable(valueNode, variables) {
  return (
    valueNode.kind === Kind.VARIABLE &&
    (variables == null || variables[valueNode.name.value] === undefined)
  );
}

/**
 * Prepares an object map of variableValues of the correct type based on the
 * provided variable definitions and arbitrary input. If the input cannot be
 * parsed to match the variable definitions, a GraphQLError will be thrown.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
function getVariableValues(schema, varDefNodes, inputs, options) {
  const errors = [];
  const maxErrors =
    options === null || options === void 0 ? void 0 : options.maxErrors;

  try {
    const coerced = coerceVariableValues(
      schema,
      varDefNodes,
      inputs,
      (error) => {
        if (maxErrors != null && errors.length >= maxErrors) {
          throw new GraphQLError(
            'Too many errors processing variables, error limit reached. Execution aborted.',
          );
        }

        errors.push(error);
      },
    );

    if (errors.length === 0) {
      return {
        coerced,
      };
    }
  } catch (error) {
    errors.push(error);
  }

  return {
    errors,
  };
}

function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  const coercedValues = {};

  for (const varDefNode of varDefNodes) {
    const varName = varDefNode.variable.name.value;
    const varType = typeFromAST(schema, varDefNode.type);

    if (!isInputType(varType)) {
      // Must use input types for variables. This should be caught during
      // validation, however is checked again here for safety.
      const varTypeStr = print(varDefNode.type);
      onError(
        new GraphQLError(
          `Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`,
          {
            nodes: varDefNode.type,
          },
        ),
      );
      continue;
    }

    if (!hasOwnProperty(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if (isNonNullType(varType)) {
        const varTypeStr = inspect$1(varType);
        onError(
          new GraphQLError(
            `Variable "$${varName}" of required type "${varTypeStr}" was not provided.`,
            {
              nodes: varDefNode,
            },
          ),
        );
      }

      continue;
    }

    const value = inputs[varName];

    if (value === null && isNonNullType(varType)) {
      const varTypeStr = inspect$1(varType);
      onError(
        new GraphQLError(
          `Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`,
          {
            nodes: varDefNode,
          },
        ),
      );
      continue;
    }

    coercedValues[varName] = coerceInputValue(
      value,
      varType,
      (path, invalidValue, error) => {
        let prefix =
          `Variable "$${varName}" got invalid value ` + inspect$1(invalidValue);

        if (path.length > 0) {
          prefix += ` at "${varName}${printPathArray(path)}"`;
        }

        onError(
          new GraphQLError(prefix + '; ' + error.message, {
            nodes: varDefNode,
            originalError: error.originalError,
          }),
        );
      },
    );
  }

  return coercedValues;
}
/**
 * Prepares an object map of argument values given a list of argument
 * definitions and list of argument AST nodes.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */

function getArgumentValues(def, node, variableValues) {
  var _node$arguments;

  const coercedValues = {}; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */

  const argumentNodes =
    (_node$arguments = node.arguments) !== null && _node$arguments !== void 0
      ? _node$arguments
      : [];
  const argNodeMap = keyMap(argumentNodes, (arg) => arg.name.value);

  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];

    if (!argumentNode) {
      if (argDef.defaultValue !== undefined) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect$1(argType)}" ` +
            'was not provided.',
          {
            nodes: node,
          },
        );
      }

      continue;
    }

    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === Kind.NULL;

    if (valueNode.kind === Kind.VARIABLE) {
      const variableName = valueNode.name.value;

      if (
        variableValues == null ||
        !hasOwnProperty(variableValues, variableName)
      ) {
        if (argDef.defaultValue !== undefined) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError(
            `Argument "${name}" of required type "${inspect$1(argType)}" ` +
              `was provided the variable "$${variableName}" which was not provided a runtime value.`,
            {
              nodes: valueNode,
            },
          );
        }

        continue;
      }

      isNull = variableValues[variableName] == null;
    }

    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError(
        `Argument "${name}" of non-null type "${inspect$1(argType)}" ` +
          'must not be null.',
        {
          nodes: valueNode,
        },
      );
    }

    const coercedValue = valueFromAST(valueNode, argType, variableValues);

    if (coercedValue === undefined) {
      // Note: ValuesOfCorrectTypeRule validation should catch this before
      // execution. This is a runtime check to ensure execution does not
      // continue with an invalid argument value.
      throw new GraphQLError(
        `Argument "${name}" has invalid value ${print(valueNode)}.`,
        {
          nodes: valueNode,
        },
      );
    }

    coercedValues[name] = coercedValue;
  }

  return coercedValues;
}
/**
 * Prepares an object map of argument values given a directive definition
 * and a AST node which may contain directives. Optionally also accepts a map
 * of variable values.
 *
 * If the directive does not exist on the node, returns undefined.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */

function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;

  const directiveNode =
    (_node$directives = node.directives) === null || _node$directives === void 0
      ? void 0
      : _node$directives.find(
          (directive) => directive.name.value === directiveDef.name,
        );

  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Given a selectionSet, collects all of the fields and returns them.
 *
 * CollectFields requires the "runtime type" of an object. For a field that
 * returns an Interface or Union type, the "runtime type" will be the actual
 * object type returned by that field.
 *
 * @internal
 */

function collectFields(
  schema,
  fragments,
  variableValues,
  runtimeType,
  selectionSet,
) {
  const fields = new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    new Set(),
  );
  return fields;
}
/**
 * Given an array of field nodes, collects all of the subfields of the passed
 * in fields, and returns them at the end.
 *
 * CollectSubFields requires the "return type" of an object. For a field that
 * returns an Interface or Union type, the "return type" will be the actual
 * object type returned by that field.
 *
 * @internal
 */

function collectSubfields$1(
  schema,
  fragments,
  variableValues,
  returnType,
  fieldNodes,
) {
  const subFieldNodes = new Map();
  const visitedFragmentNames = new Set();

  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames,
      );
    }
  }

  return subFieldNodes;
}

function collectFieldsImpl(
  schema,
  fragments,
  variableValues,
  runtimeType,
  selectionSet,
  fields,
  visitedFragmentNames,
) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }

        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);

        if (fieldList !== undefined) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }

        break;
      }

      case Kind.INLINE_FRAGMENT: {
        if (
          !shouldIncludeNode(variableValues, selection) ||
          !doesFragmentConditionMatch(schema, selection, runtimeType)
        ) {
          continue;
        }

        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames,
        );
        break;
      }

      case Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;

        if (
          visitedFragmentNames.has(fragName) ||
          !shouldIncludeNode(variableValues, selection)
        ) {
          continue;
        }

        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];

        if (
          !fragment ||
          !doesFragmentConditionMatch(schema, fragment, runtimeType)
        ) {
          continue;
        }

        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames,
        );
        break;
      }
    }
  }
}
/**
 * Determines if a field should be included based on the `@include` and `@skip`
 * directives, where `@skip` has higher precedence than `@include`.
 */

function shouldIncludeNode(variableValues, node) {
  const skip = getDirectiveValues(GraphQLSkipDirective, node, variableValues);

  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }

  const include = getDirectiveValues(
    GraphQLIncludeDirective,
    node,
    variableValues,
  );

  if (
    (include === null || include === void 0 ? void 0 : include.if) === false
  ) {
    return false;
  }

  return true;
}
/**
 * Determines if a fragment is applicable to the given type.
 */

function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;

  if (!typeConditionNode) {
    return true;
  }

  const conditionalType = typeFromAST(schema, typeConditionNode);

  if (conditionalType === type) {
    return true;
  }

  if (isAbstractType(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }

  return false;
}
/**
 * Implements the logic to compute the key of a given field's entry
 */

function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}

/**
 * Subscriptions must only include a non-introspection field.
 *
 * A GraphQL subscription is valid only if it contains a single root field and
 * that root field is not an introspection field.
 *
 * See https://spec.graphql.org/draft/#sec-Single-root-field
 */
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition(node) {
      if (node.operation === 'subscription') {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();

        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = Object.create(null);
          const document = context.getDocument();
          const fragments = Object.create(null);

          for (const definition of document.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }

          const fields = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet,
          );

          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context.reportError(
              new GraphQLError(
                operationName != null
                  ? `Subscription "${operationName}" must select only one top level field.`
                  : 'Anonymous Subscription must select only one top level field.',
                {
                  nodes: extraFieldSelections,
                },
              ),
            );
          }

          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;

            if (fieldName.startsWith('__')) {
              context.reportError(
                new GraphQLError(
                  operationName != null
                    ? `Subscription "${operationName}" must not select an introspection top level field.`
                    : 'Anonymous Subscription must not select an introspection top level field.',
                  {
                    nodes: fieldNodes,
                  },
                ),
              );
            }
          }
        }
      }
    },
  };
}

/**
 * Groups array items into a Map, given a function to produce grouping key.
 */
function groupBy(list, keyFn) {
  const result = new Map();

  for (const item of list) {
    const key = keyFn(item);
    const group = result.get(key);

    if (group === undefined) {
      result.set(key, [item]);
    } else {
      group.push(item);
    }
  }

  return result;
}

/**
 * Unique argument definition names
 *
 * A GraphQL Object or Interface type is only valid if all its fields have uniquely named arguments.
 * A GraphQL Directive is only valid if all its arguments are uniquely named.
 */
function UniqueArgumentDefinitionNamesRule(context) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argumentNodes =
        (_directiveNode$argume = directiveNode.arguments) !== null &&
        _directiveNode$argume !== void 0
          ? _directiveNode$argume
          : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },

    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField,
  };

  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;

    const typeName = typeNode.name.value; // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const fieldNodes =
      (_typeNode$fields = typeNode.fields) !== null &&
      _typeNode$fields !== void 0
        ? _typeNode$fields
        : [];

    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;

      const fieldName = fieldDef.name.value; // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */

      const argumentNodes =
        (_fieldDef$arguments = fieldDef.arguments) !== null &&
        _fieldDef$arguments !== void 0
          ? _fieldDef$arguments
          : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }

    return false;
  }

  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);

    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            {
              nodes: argNodes.map((node) => node.name),
            },
          ),
        );
      }
    }

    return false;
  }
}

/**
 * Unique argument names
 *
 * A GraphQL field or directive is only valid if all supplied arguments are
 * uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Argument-Names
 */
function UniqueArgumentNamesRule(context) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness,
  };

  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;

    // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */
    const argumentNodes =
      (_parentNode$arguments = parentNode.arguments) !== null &&
      _parentNode$arguments !== void 0
        ? _parentNode$arguments
        : [];
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);

    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `There can be only one argument named "${argName}".`,
            {
              nodes: argNodes.map((node) => node.name),
            },
          ),
        );
      }
    }
  }
}

/**
 * Unique directive names
 *
 * A GraphQL document is only valid if all defined directives have unique names.
 */
function UniqueDirectiveNamesRule(context) {
  const knownDirectiveNames = Object.create(null);
  const schema = context.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;

      if (
        schema !== null &&
        schema !== void 0 &&
        schema.getDirective(directiveName)
      ) {
        context.reportError(
          new GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            {
              nodes: node.name,
            },
          ),
        );
        return;
      }

      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            {
              nodes: [knownDirectiveNames[directiveName], node.name],
            },
          ),
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }

      return false;
    },
  };
}

/**
 * Unique directive names per location
 *
 * A GraphQL document is only valid if all non-repeatable directives at
 * a given location are uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Directives-Are-Unique-Per-Location
 */
function UniqueDirectivesPerLocationRule(context) {
  const uniqueDirectiveMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : specifiedDirectives;

  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }

  const schemaDirectives = Object.create(null);
  const typeDirectivesMap = Object.create(null);
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter(node) {
      if (!('directives' in node) || !node.directives) {
        return;
      }

      let seenDirectives;

      if (
        node.kind === Kind.SCHEMA_DEFINITION ||
        node.kind === Kind.SCHEMA_EXTENSION
      ) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];

        if (seenDirectives === undefined) {
          typeDirectivesMap[typeName] = seenDirectives = Object.create(null);
        }
      } else {
        seenDirectives = Object.create(null);
      }

      for (const directive of node.directives) {
        const directiveName = directive.name.value;

        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(
              new GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                {
                  nodes: [seenDirectives[directiveName], directive],
                },
              ),
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    },
  };
}

/**
 * Unique enum value names
 *
 * A GraphQL enum type is only valid if all its values are uniquely named.
 */
function UniqueEnumValueNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownValueNames = Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness,
  };

  function checkValueUniqueness(node) {
    var _node$values;

    const typeName = node.name.value;

    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = Object.create(null);
    } // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const valueNodes =
      (_node$values = node.values) !== null && _node$values !== void 0
        ? _node$values
        : [];
    const valueNames = knownValueNames[typeName];

    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];

      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: valueDef.name,
            },
          ),
        );
      } else if (valueNames[valueName]) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            {
              nodes: [valueNames[valueName], valueDef.name],
            },
          ),
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }

    return false;
  }
}

/**
 * Unique field definition names
 *
 * A GraphQL complex type is only valid if all its fields are uniquely named.
 */
function UniqueFieldDefinitionNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownFieldNames = Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness,
  };

  function checkFieldUniqueness(node) {
    var _node$fields;

    const typeName = node.name.value;

    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = Object.create(null);
    } // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const fieldNodes =
      (_node$fields = node.fields) !== null && _node$fields !== void 0
        ? _node$fields
        : [];
    const fieldNames = knownFieldNames[typeName];

    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;

      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: fieldDef.name,
            },
          ),
        );
      } else if (fieldNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            {
              nodes: [fieldNames[fieldName], fieldDef.name],
            },
          ),
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }

    return false;
  }
}

function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }

  return false;
}

/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-Name-Uniqueness
 */
function UniqueFragmentNamesRule(context) {
  const knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: () => false,

    FragmentDefinition(node) {
      const fragmentName = node.name.value;

      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            {
              nodes: [knownFragmentNames[fragmentName], node.name],
            },
          ),
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }

      return false;
    },
  };
}

/**
 * Unique input field names
 *
 * A GraphQL input object value is only valid if all supplied fields are
 * uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Input-Object-Field-Uniqueness
 */
function UniqueInputFieldNamesRule(context) {
  const knownNameStack = [];
  let knownNames = Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = Object.create(null);
      },

      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || invariant$1(false);
        knownNames = prevKnownNames;
      },
    },

    ObjectField(node) {
      const fieldName = node.name.value;

      if (knownNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            {
              nodes: [knownNames[fieldName], node.name],
            },
          ),
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    },
  };
}

/**
 * Unique operation names
 *
 * A GraphQL document is only valid if all defined operations have unique names.
 *
 * See https://spec.graphql.org/draft/#sec-Operation-Name-Uniqueness
 */
function UniqueOperationNamesRule(context) {
  const knownOperationNames = Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;

      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(
            new GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              {
                nodes: [
                  knownOperationNames[operationName.value],
                  operationName,
                ],
              },
            ),
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }

      return false;
    },

    FragmentDefinition: () => false,
  };
}

/**
 * Unique operation types
 *
 * A GraphQL document is only valid if it has only one type per operation.
 */
function UniqueOperationTypesRule(context) {
  const schema = context.getSchema();
  const definedOperationTypes = Object.create(null);
  const existingOperationTypes = schema
    ? {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
      }
    : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes,
  };

  function checkOperationTypes(node) {
    var _node$operationTypes;

    // See: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */
    const operationTypesNodes =
      (_node$operationTypes = node.operationTypes) !== null &&
      _node$operationTypes !== void 0
        ? _node$operationTypes
        : [];

    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];

      if (existingOperationTypes[operation]) {
        context.reportError(
          new GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            {
              nodes: operationType,
            },
          ),
        );
      } else if (alreadyDefinedOperationType) {
        context.reportError(
          new GraphQLError(
            `There can be only one ${operation} type in schema.`,
            {
              nodes: [alreadyDefinedOperationType, operationType],
            },
          ),
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }

    return false;
  }
}

/**
 * Unique type names
 *
 * A GraphQL document is only valid if all defined types have unique names.
 */
function UniqueTypeNamesRule(context) {
  const knownTypeNames = Object.create(null);
  const schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName,
  };

  function checkTypeName(node) {
    const typeName = node.name.value;

    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(
        new GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          {
            nodes: node.name,
          },
        ),
      );
      return;
    }

    if (knownTypeNames[typeName]) {
      context.reportError(
        new GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name],
        }),
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }

    return false;
  }
}

/**
 * Unique variable names
 *
 * A GraphQL operation is only valid if all its variables are uniquely named.
 */
function UniqueVariableNamesRule(context) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;

      // See: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const variableDefinitions =
        (_operationNode$variab = operationNode.variableDefinitions) !== null &&
        _operationNode$variab !== void 0
          ? _operationNode$variab
          : [];
      const seenVariableDefinitions = groupBy(
        variableDefinitions,
        (node) => node.variable.name.value,
      );

      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context.reportError(
            new GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              {
                nodes: variableNodes.map((node) => node.variable.name),
              },
            ),
          );
        }
      }
    },
  };
}

/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 *
 * See https://spec.graphql.org/draft/#sec-Values-of-Correct-Type
 */
function ValuesOfCorrectTypeRule(context) {
  return {
    ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      const type = getNullableType(context.getParentInputType());

      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false; // Don't traverse further.
      }
    },

    ObjectValue(node) {
      const type = getNamedType(context.getInputType());

      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false; // Don't traverse further.
      } // Ensure every required field exists.

      const fieldNodeMap = keyMap(node.fields, (field) => field.name.value);

      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];

        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect$1(fieldDef.type);
          context.reportError(
            new GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              {
                nodes: node,
              },
            ),
          );
        }
      }
    },

    ObjectField(node) {
      const parentType = getNamedType(context.getParentInputType());
      const fieldType = context.getInputType();

      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields()),
        );
        context.reportError(
          new GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` +
              didYouMean(suggestions),
            {
              nodes: node,
            },
          ),
        );
      }
    },

    NullValue(node) {
      const type = context.getInputType();

      if (isNonNullType(type)) {
        context.reportError(
          new GraphQLError(
            `Expected value of type "${inspect$1(type)}", found ${print(node)}.`,
            {
              nodes: node,
            },
          ),
        );
      }
    },

    EnumValue: (node) => isValidValueNode(context, node),
    IntValue: (node) => isValidValueNode(context, node),
    FloatValue: (node) => isValidValueNode(context, node),
    StringValue: (node) => isValidValueNode(context, node),
    BooleanValue: (node) => isValidValueNode(context, node),
  };
}
/**
 * Any value literal may be a valid representation of a Scalar, depending on
 * that scalar type.
 */

function isValidValueNode(context, node) {
  // Report any error at the full type expected by the location.
  const locationType = context.getInputType();

  if (!locationType) {
    return;
  }

  const type = getNamedType(locationType);

  if (!isLeafType(type)) {
    const typeStr = inspect$1(locationType);
    context.reportError(
      new GraphQLError(
        `Expected value of type "${typeStr}", found ${print(node)}.`,
        {
          nodes: node,
        },
      ),
    );
    return;
  } // Scalars and Enums determine if a literal value is valid via parseLiteral(),
  // which may throw or return an invalid value to indicate failure.

  try {
    const parseResult = type.parseLiteral(
      node,
      undefined,
      /* variables */
    );

    if (parseResult === undefined) {
      const typeStr = inspect$1(locationType);
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}.`,
          {
            nodes: node,
          },
        ),
      );
    }
  } catch (error) {
    const typeStr = inspect$1(locationType);

    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}; ` +
            error.message,
          {
            nodes: node,
            originalError: error,
          },
        ),
      );
    }
  }
}

/**
 * Variables are input types
 *
 * A GraphQL operation is only valid if all the variables it defines are of
 * input types (scalar, enum, or input object).
 *
 * See https://spec.graphql.org/draft/#sec-Variables-Are-Input-Types
 */
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.type);

      if (type !== undefined && !isInputType(type)) {
        const variableName = node.variable.name.value;
        const typeName = print(node.type);
        context.reportError(
          new GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            {
              nodes: node.type,
            },
          ),
        );
      }
    },
  };
}

/**
 * Variables in allowed position
 *
 * Variable usages must be compatible with the arguments they are passed to.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variable-Usages-are-Allowed
 */
function VariablesInAllowedPositionRule(context) {
  let varDefMap = Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = Object.create(null);
      },

      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node, type, defaultValue } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];

          if (varDef && type) {
            // A var type is allowed if it is the same or more strict (e.g. is
            // a subtype of) than the expected type. It can be more strict if
            // the variable type is non-null when the expected type is nullable.
            // If both are list types, the variable item type can be more strict
            // than the expected item type (contravariant).
            const schema = context.getSchema();
            const varType = typeFromAST(schema, varDef.type);

            if (
              varType &&
              !allowedVariableUsage(
                schema,
                varType,
                varDef.defaultValue,
                type,
                defaultValue,
              )
            ) {
              const varTypeStr = inspect$1(varType);
              const typeStr = inspect$1(type);
              context.reportError(
                new GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  {
                    nodes: [varDef, node],
                  },
                ),
              );
            }
          }
        }
      },
    },

    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    },
  };
}
/**
 * Returns true if the variable is allowed in the location it was found,
 * which includes considering if default values exist for either the variable
 * or the location at which it is located.
 */

function allowedVariableUsage(
  schema,
  varType,
  varDefaultValue,
  locationType,
  locationDefaultValue,
) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    const hasNonNullVariableDefaultValue =
      varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== undefined;

    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }

    const nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }

  return isTypeSubTypeOf(schema, varType, locationType);
}

// Spec Section: "Executable Definitions"

/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */
const specifiedRules = Object.freeze([
  ExecutableDefinitionsRule,
  UniqueOperationNamesRule,
  LoneAnonymousOperationRule,
  SingleFieldSubscriptionsRule,
  KnownTypeNamesRule,
  FragmentsOnCompositeTypesRule,
  VariablesAreInputTypesRule,
  ScalarLeafsRule,
  FieldsOnCorrectTypeRule,
  UniqueFragmentNamesRule,
  KnownFragmentNamesRule,
  NoUnusedFragmentsRule,
  PossibleFragmentSpreadsRule,
  NoFragmentCyclesRule,
  UniqueVariableNamesRule,
  NoUndefinedVariablesRule,
  NoUnusedVariablesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  KnownArgumentNamesRule,
  UniqueArgumentNamesRule,
  ValuesOfCorrectTypeRule,
  ProvidedRequiredArgumentsRule,
  VariablesInAllowedPositionRule,
  OverlappingFieldsCanBeMergedRule,
  UniqueInputFieldNamesRule,
]);
/**
 * @internal
 */

const specifiedSDLRules = Object.freeze([
  LoneSchemaDefinitionRule,
  UniqueOperationTypesRule,
  UniqueTypeNamesRule,
  UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule,
  UniqueArgumentDefinitionNamesRule,
  UniqueDirectiveNamesRule,
  KnownTypeNamesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  PossibleTypeExtensionsRule,
  KnownArgumentNamesOnDirectivesRule,
  UniqueArgumentNamesRule,
  UniqueInputFieldNamesRule,
  ProvidedRequiredArgumentsOnDirectivesRule,
]);

/**
 * An instance of this class is passed as the "this" context to all validators,
 * allowing access to commonly useful contextual information from within a
 * validation rule.
 */
class ASTValidationContext {
  constructor(ast, onError) {
    this._ast = ast;
    this._fragments = undefined;
    this._fragmentSpreads = new Map();
    this._recursivelyReferencedFragments = new Map();
    this._onError = onError;
  }

  get [Symbol.toStringTag]() {
    return 'ASTValidationContext';
  }

  reportError(error) {
    this._onError(error);
  }

  getDocument() {
    return this._ast;
  }

  getFragment(name) {
    let fragments;

    if (this._fragments) {
      fragments = this._fragments;
    } else {
      fragments = Object.create(null);

      for (const defNode of this.getDocument().definitions) {
        if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
          fragments[defNode.name.value] = defNode;
        }
      }

      this._fragments = fragments;
    }

    return fragments[name];
  }

  getFragmentSpreads(node) {
    let spreads = this._fragmentSpreads.get(node);

    if (!spreads) {
      spreads = [];
      const setsToVisit = [node];
      let set;

      while ((set = setsToVisit.pop())) {
        for (const selection of set.selections) {
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }

      this._fragmentSpreads.set(node, spreads);
    }

    return spreads;
  }

  getRecursivelyReferencedFragments(operation) {
    let fragments = this._recursivelyReferencedFragments.get(operation);

    if (!fragments) {
      fragments = [];
      const collectedNames = Object.create(null);
      const nodesToVisit = [operation.selectionSet];
      let node;

      while ((node = nodesToVisit.pop())) {
        for (const spread of this.getFragmentSpreads(node)) {
          const fragName = spread.name.value;

          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            const fragment = this.getFragment(fragName);

            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }

      this._recursivelyReferencedFragments.set(operation, fragments);
    }

    return fragments;
  }
}
class SDLValidationContext extends ASTValidationContext {
  constructor(ast, schema, onError) {
    super(ast, onError);
    this._schema = schema;
  }

  get [Symbol.toStringTag]() {
    return 'SDLValidationContext';
  }

  getSchema() {
    return this._schema;
  }
}
class ValidationContext extends ASTValidationContext {
  constructor(schema, ast, typeInfo, onError) {
    super(ast, onError);
    this._schema = schema;
    this._typeInfo = typeInfo;
    this._variableUsages = new Map();
    this._recursiveVariableUsages = new Map();
  }

  get [Symbol.toStringTag]() {
    return 'ValidationContext';
  }

  getSchema() {
    return this._schema;
  }

  getVariableUsages(node) {
    let usages = this._variableUsages.get(node);

    if (!usages) {
      const newUsages = [];
      const typeInfo = new TypeInfo(this._schema);
      visit(
        node,
        visitWithTypeInfo(typeInfo, {
          VariableDefinition: () => false,

          Variable(variable) {
            newUsages.push({
              node: variable,
              type: typeInfo.getInputType(),
              defaultValue: typeInfo.getDefaultValue(),
            });
          },
        }),
      );
      usages = newUsages;

      this._variableUsages.set(node, usages);
    }

    return usages;
  }

  getRecursiveVariableUsages(operation) {
    let usages = this._recursiveVariableUsages.get(operation);

    if (!usages) {
      usages = this.getVariableUsages(operation);

      for (const frag of this.getRecursivelyReferencedFragments(operation)) {
        usages = usages.concat(this.getVariableUsages(frag));
      }

      this._recursiveVariableUsages.set(operation, usages);
    }

    return usages;
  }

  getType() {
    return this._typeInfo.getType();
  }

  getParentType() {
    return this._typeInfo.getParentType();
  }

  getInputType() {
    return this._typeInfo.getInputType();
  }

  getParentInputType() {
    return this._typeInfo.getParentInputType();
  }

  getFieldDef() {
    return this._typeInfo.getFieldDef();
  }

  getDirective() {
    return this._typeInfo.getDirective();
  }

  getArgument() {
    return this._typeInfo.getArgument();
  }

  getEnumValue() {
    return this._typeInfo.getEnumValue();
  }
}

/**
 * Implements the "Validation" section of the spec.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the document is valid.
 *
 * A list of specific validation rules may be provided. If not provided, the
 * default list of rules defined by the GraphQL specification will be used.
 *
 * Each validation rules is a function which returns a visitor
 * (see the language/visitor API). Visitor methods are expected to return
 * GraphQLErrors, or Arrays of GraphQLErrors when invalid.
 *
 * Validate will stop validation after a `maxErrors` limit has been reached.
 * Attackers can send pathologically invalid queries to induce a DoS attack,
 * so by default `maxErrors` set to 100 errors.
 *
 * Optionally a custom TypeInfo instance may be provided. If not provided, one
 * will be created from the provided schema.
 */

function validate(
  schema,
  documentAST,
  rules = specifiedRules,
  options,
  /** @deprecated will be removed in 17.0.0 */
  typeInfo = new TypeInfo(schema),
) {
  var _options$maxErrors;

  const maxErrors =
    (_options$maxErrors =
      options === null || options === void 0 ? void 0 : options.maxErrors) !==
      null && _options$maxErrors !== void 0
      ? _options$maxErrors
      : 100;
  documentAST || devAssert(false, 'Must provide document.'); // If the schema used for validation is invalid, throw an error.

  assertValidSchema(schema);
  const abortObj = Object.freeze({});
  const errors = [];
  const context = new ValidationContext(
    schema,
    documentAST,
    typeInfo,
    (error) => {
      if (errors.length >= maxErrors) {
        errors.push(
          new GraphQLError(
            'Too many validation errors, error limit reached. Validation aborted.',
          ),
        ); // eslint-disable-next-line @typescript-eslint/no-throw-literal

        throw abortObj;
      }

      errors.push(error);
    },
  ); // This uses a specialized visitor which runs multiple visitors in parallel,
  // while maintaining the visitor skip and break API.

  const visitor = visitInParallel(rules.map((rule) => rule(context))); // Visit the whole document with each instance of all provided rules.

  try {
    visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  } catch (e) {
    if (e !== abortObj) {
      throw e;
    }
  }

  return errors;
}
/**
 * @internal
 */

function validateSDL(
  documentAST,
  schemaToExtend,
  rules = specifiedSDLRules,
) {
  const errors = [];
  const context = new SDLValidationContext(
    documentAST,
    schemaToExtend,
    (error) => {
      errors.push(error);
    },
  );
  const visitors = rules.map((rule) => rule(context));
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */

function assertValidSDL(documentAST) {
  const errors = validateSDL(documentAST);

  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join('\n\n'));
  }
}

/**
 * Memoizes the provided three-argument function.
 */
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === undefined) {
      cache0 = new WeakMap();
    }

    let cache1 = cache0.get(a1);

    if (cache1 === undefined) {
      cache1 = new WeakMap();
      cache0.set(a1, cache1);
    }

    let cache2 = cache1.get(a2);

    if (cache2 === undefined) {
      cache2 = new WeakMap();
      cache1.set(a2, cache2);
    }

    let fnResult = cache2.get(a3);

    if (fnResult === undefined) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }

    return fnResult;
  };
}

/**
 * This function transforms a JS object `ObjMap<Promise<T>>` into
 * a `Promise<ObjMap<T>>`
 *
 * This is akin to bluebird's `Promise.props`, but implemented only using
 * `Promise.all` so it will work with any implementation of ES6 promises.
 */
function promiseForObject(object) {
  return Promise.all(Object.values(object)).then((resolvedValues) => {
    const resolvedObject = Object.create(null);

    for (const [i, key] of Object.keys(object).entries()) {
      resolvedObject[key] = resolvedValues[i];
    }

    return resolvedObject;
  });
}

/**
 * Similar to Array.prototype.reduce(), however the reducing callback may return
 * a Promise, in which case reduction will continue after each promise resolves.
 *
 * If the callback does not return a Promise, then this function will also not
 * return a Promise.
 */
function promiseReduce(values, callbackFn, initialValue) {
  let accumulator = initialValue;

  for (const value of values) {
    accumulator = isPromise(accumulator)
      ? accumulator.then((resolved) => callbackFn(resolved, value))
      : callbackFn(accumulator, value);
  }

  return accumulator;
}

/**
 * Sometimes a non-error is thrown, wrap it as an Error instance to ensure a consistent Error interface.
 */

function toError(thrownValue) {
  return thrownValue instanceof Error
    ? thrownValue
    : new NonErrorThrown(thrownValue);
}

class NonErrorThrown extends Error {
  constructor(thrownValue) {
    super('Unexpected error value: ' + inspect$1(thrownValue));
    this.name = 'NonErrorThrown';
    this.thrownValue = thrownValue;
  }
}

/**
 * Given an arbitrary value, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */

function locatedError(rawOriginalError, nodes, path) {
  var _nodes;

  const originalError = toError(rawOriginalError); // Note: this uses a brand-check to support GraphQL errors originating from other contexts.

  if (isLocatedGraphQLError(originalError)) {
    return originalError;
  }

  return new GraphQLError(originalError.message, {
    nodes:
      (_nodes = originalError.nodes) !== null && _nodes !== void 0
        ? _nodes
        : nodes,
    source: originalError.source,
    positions: originalError.positions,
    path,
    originalError,
  });
}

function isLocatedGraphQLError(error) {
  return Array.isArray(error.path);
}

/**
 * A memoized collection of relevant subfields with regard to the return
 * type. Memoizing ensures the subfields are not repeatedly calculated, which
 * saves overhead when resolving lists of values.
 */

const collectSubfields = memoize3((exeContext, returnType, fieldNodes) =>
  collectSubfields$1(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    returnType,
    fieldNodes,
  ),
);
/**
 * Terminology
 *
 * "Definitions" are the generic name for top-level statements in the document.
 * Examples of this include:
 * 1) Operations (such as a query)
 * 2) Fragments
 *
 * "Operations" are a generic name for requests in the document.
 * Examples of this include:
 * 1) query,
 * 2) mutation
 *
 * "Selections" are the definitions that can appear legally and at
 * single level of the query. These include:
 * 1) field references e.g `a`
 * 2) fragment "spreads" e.g. `...c`
 * 3) inline fragment "spreads" e.g. `...on Type { a }`
 */

/**
 * Data that must be available at all points during query execution.
 *
 * Namely, schema of the type system that is currently executing,
 * and the fragments defined in the query document
 */

/**
 * Implements the "Executing requests" section of the GraphQL specification.
 *
 * Returns either a synchronous ExecutionResult (if all encountered resolvers
 * are synchronous), or a Promise of an ExecutionResult that will eventually be
 * resolved and never rejected.
 *
 * If the arguments to this function do not result in a legal execution context,
 * a GraphQLError will be thrown immediately explaining the invalid input.
 */
function execute$1(args) {
  // Temporary for v15 to v16 migration. Remove in v17
  arguments.length < 2 ||
    devAssert(
      false,
      'graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.',
    );
  const { schema, document, variableValues, rootValue } = args; // If arguments are missing or incorrect, throw an error.

  assertValidExecutionArguments(schema, document, variableValues); // If a valid execution context cannot be created due to incorrect arguments,
  // a "Response" with only errors is returned.

  const exeContext = buildExecutionContext(args); // Return early errors if execution context failed.

  if (!('schema' in exeContext)) {
    return {
      errors: exeContext,
    };
  } // Return a Promise that will eventually resolve to the data described by
  // The "Response" section of the GraphQL specification.
  //
  // If errors are encountered while executing a GraphQL field, only that
  // field and its descendants will be omitted, and sibling fields will still
  // be executed. An execution which encounters errors will still result in a
  // resolved Promise.
  //
  // Errors from sub-fields of a NonNull type may propagate to the top level,
  // at which point we still log the error and null the parent field, which
  // in this case is the entire response.

  try {
    const { operation } = exeContext;
    const result = executeOperation(exeContext, operation, rootValue);

    if (isPromise(result)) {
      return result.then(
        (data) => buildResponse(data, exeContext.errors),
        (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        },
      );
    }

    return buildResponse(result, exeContext.errors);
  } catch (error) {
    exeContext.errors.push(error);
    return buildResponse(null, exeContext.errors);
  }
}
/**
 * Given a completed execution context and data, build the `{ errors, data }`
 * response defined by the "Response" section of the GraphQL specification.
 */

function buildResponse(data, errors) {
  return errors.length === 0
    ? {
        data,
      }
    : {
        errors,
        data,
      };
}
/**
 * Essential assertions before executing to provide developer feedback for
 * improper use of the GraphQL library.
 *
 * @internal
 */

function assertValidExecutionArguments(
  schema,
  document,
  rawVariableValues,
) {
  document || devAssert(false, 'Must provide document.'); // If the schema used for execution is invalid, throw an error.

  assertValidSchema(schema); // Variables, if provided, must be an object.

  rawVariableValues == null ||
    isObjectLike(rawVariableValues) ||
    devAssert(
      false,
      'Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.',
    );
}
/**
 * Constructs a ExecutionContext object from the arguments passed to
 * execute, which we will pass throughout the other execution methods.
 *
 * Throws a GraphQLError if a valid execution context cannot be created.
 *
 * @internal
 */

function buildExecutionContext(args) {
  var _definition$name, _operation$variableDe;

  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues: rawVariableValues,
    operationName,
    fieldResolver,
    typeResolver,
    subscribeFieldResolver,
  } = args;
  let operation;
  const fragments = Object.create(null);

  for (const definition of document.definitions) {
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== undefined) {
            return [
              new GraphQLError(
                'Must provide operation name if query contains multiple operations.',
              ),
            ];
          }

          operation = definition;
        } else if (
          ((_definition$name = definition.name) === null ||
          _definition$name === void 0
            ? void 0
            : _definition$name.value) === operationName
        ) {
          operation = definition;
        }

        break;

      case Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
    }
  }

  if (!operation) {
    if (operationName != null) {
      return [new GraphQLError(`Unknown operation named "${operationName}".`)];
    }

    return [new GraphQLError('Must provide an operation.')];
  } // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */

  const variableDefinitions =
    (_operation$variableDe = operation.variableDefinitions) !== null &&
    _operation$variableDe !== void 0
      ? _operation$variableDe
      : [];
  const coercedVariableValues = getVariableValues(
    schema,
    variableDefinitions,
    rawVariableValues !== null && rawVariableValues !== void 0
      ? rawVariableValues
      : {},
    {
      maxErrors: 50,
    },
  );

  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }

  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver:
      fieldResolver !== null && fieldResolver !== void 0
        ? fieldResolver
        : defaultFieldResolver,
    typeResolver:
      typeResolver !== null && typeResolver !== void 0
        ? typeResolver
        : defaultTypeResolver,
    subscribeFieldResolver:
      subscribeFieldResolver !== null && subscribeFieldResolver !== void 0
        ? subscribeFieldResolver
        : defaultFieldResolver,
    errors: [],
  };
}
/**
 * Implements the "Executing operations" section of the spec.
 */

function executeOperation(exeContext, operation, rootValue) {
  const rootType = exeContext.schema.getRootType(operation.operation);

  if (rootType == null) {
    throw new GraphQLError(
      `Schema is not configured to execute ${operation.operation} operation.`,
      {
        nodes: operation,
      },
    );
  }

  const rootFields = collectFields(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    rootType,
    operation.selectionSet,
  );
  const path = undefined;

  switch (operation.operation) {
    case OperationTypeNode.QUERY:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);

    case OperationTypeNode.MUTATION:
      return executeFieldsSerially(
        exeContext,
        rootType,
        rootValue,
        path,
        rootFields,
      );

    case OperationTypeNode.SUBSCRIPTION:
      // TODO: deprecate `subscribe` and move all logic here
      // Temporary solution until we finish merging execute and subscribe together
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
  }
}
/**
 * Implements the "Executing selection sets" section of the spec
 * for fields that must be executed serially.
 */

function executeFieldsSerially(
  exeContext,
  parentType,
  sourceValue,
  path,
  fields,
) {
  return promiseReduce(
    fields.entries(),
    (results, [responseName, fieldNodes]) => {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath,
      );

      if (result === undefined) {
        return results;
      }

      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }

      results[responseName] = result;
      return results;
    },
    Object.create(null),
  );
}
/**
 * Implements the "Executing selection sets" section of the spec
 * for fields that may be executed in parallel.
 */

function executeFields(exeContext, parentType, sourceValue, path, fields) {
  const results = Object.create(null);
  let containsPromise = false;

  for (const [responseName, fieldNodes] of fields.entries()) {
    const fieldPath = addPath(path, responseName, parentType.name);
    const result = executeField(
      exeContext,
      parentType,
      sourceValue,
      fieldNodes,
      fieldPath,
    );

    if (result !== undefined) {
      results[responseName] = result;

      if (isPromise(result)) {
        containsPromise = true;
      }
    }
  } // If there are no promises, we can just return the object

  if (!containsPromise) {
    return results;
  } // Otherwise, results is a map from field name to the result of resolving that
  // field, which is possibly a promise. Return a promise that will return this
  // same map, but with any promises replaced with the values they resolved to.

  return promiseForObject(results);
}
/**
 * Implements the "Executing fields" section of the spec
 * In particular, this function figures out the value that the field returns by
 * calling its resolve function, then calls completeValue to complete promises,
 * serialize scalars, or execute the sub-selection-set for objects.
 */

function executeField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;

  const fieldDef = getFieldDef(exeContext.schema, parentType, fieldNodes[0]);

  if (!fieldDef) {
    return;
  }

  const returnType = fieldDef.type;
  const resolveFn =
    (_fieldDef$resolve = fieldDef.resolve) !== null &&
    _fieldDef$resolve !== void 0
      ? _fieldDef$resolve
      : exeContext.fieldResolver;
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    parentType,
    path,
  ); // Get the resolve function, regardless of if its result is normal or abrupt (error).

  try {
    // Build a JS object of arguments from the field.arguments AST, using the
    // variables scope to fulfill any variable references.
    // TODO: find a way to memoize, in case this field is within a List type.
    const args = getArgumentValues(
      fieldDef,
      fieldNodes[0],
      exeContext.variableValues,
    ); // The resolve function's optional third argument is a context value that
    // is provided to every resolve function within an execution. It is commonly
    // used to represent an authenticated user, or request-specific caches.

    const contextValue = exeContext.contextValue;
    const result = resolveFn(source, args, contextValue, info);
    let completed;

    if (isPromise(result)) {
      completed = result.then((resolved) =>
        completeValue(exeContext, returnType, fieldNodes, info, path, resolved),
      );
    } else {
      completed = completeValue(
        exeContext,
        returnType,
        fieldNodes,
        info,
        path,
        result,
      );
    }

    if (isPromise(completed)) {
      // Note: we don't rely on a `catch` method, but we do expect "thenable"
      // to take a second callback for the error case.
      return completed.then(undefined, (rawError) => {
        const error = locatedError(rawError, fieldNodes, pathToArray(path));
        return handleFieldError(error, returnType, exeContext);
      });
    }

    return completed;
  } catch (rawError) {
    const error = locatedError(rawError, fieldNodes, pathToArray(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
/**
 * @internal
 */

function buildResolveInfo(
  exeContext,
  fieldDef,
  fieldNodes,
  parentType,
  path,
) {
  // The resolve function's optional fourth argument is a collection of
  // information about the current execution state.
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues,
  };
}

function handleFieldError(error, returnType, exeContext) {
  // If the field type is non-nullable, then it is resolved without any
  // protection from errors, however it still properly locates the error.
  if (isNonNullType(returnType)) {
    throw error;
  } // Otherwise, error protection is applied, logging the error and resolving
  // a null value for this field if one is encountered.

  exeContext.errors.push(error);
  return null;
}
/**
 * Implements the instructions for completeValue as defined in the
 * "Value Completion" section of the spec.
 *
 * If the field type is Non-Null, then this recursively completes the value
 * for the inner type. It throws a field error if that completion returns null,
 * as per the "Nullability" section of the spec.
 *
 * If the field type is a List, then this recursively completes the value
 * for the inner type on each item in the list.
 *
 * If the field type is a Scalar or Enum, ensures the completed value is a legal
 * value of the type by calling the `serialize` method of GraphQL type
 * definition.
 *
 * If the field is an abstract type, determine the runtime type of the value
 * and then complete based on that type
 *
 * Otherwise, the field type expects a sub-selection set, and will complete the
 * value by executing all sub-selections.
 */

function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  // If result is an Error, throw a located error.
  if (result instanceof Error) {
    throw result;
  } // If field type is NonNull, complete for inner type, and throw field error
  // if result is null.

  if (isNonNullType(returnType)) {
    const completed = completeValue(
      exeContext,
      returnType.ofType,
      fieldNodes,
      info,
      path,
      result,
    );

    if (completed === null) {
      throw new Error(
        `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`,
      );
    }

    return completed;
  } // If result value is null or undefined then return null.

  if (result == null) {
    return null;
  } // If field type is List, complete each item in the list with the inner type

  if (isListType(returnType)) {
    return completeListValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  } // If field type is a leaf type, Scalar or Enum, serialize to a valid value,
  // returning null if serialization is not possible.

  if (isLeafType(returnType)) {
    return completeLeafValue(returnType, result);
  } // If field type is an abstract type, Interface or Union, determine the
  // runtime Object type and complete for that type.

  if (isAbstractType(returnType)) {
    return completeAbstractValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  } // If field type is Object, execute and complete all sub-selections.

  if (isObjectType(returnType)) {
    return completeObjectValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  }
  /* c8 ignore next 6 */
  // Not reachable, all possible output types have been considered.

  invariant$1(
      false,
      'Cannot complete value of unexpected output type: ' + inspect$1(returnType),
    );
}
/**
 * Complete a list value by completing each item in the list with the
 * inner type
 */

function completeListValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  if (!isIterableObject(result)) {
    throw new GraphQLError(
      `Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`,
    );
  } // This is specified as a simple map, however we're optimizing the path
  // where the list contains no Promises by avoiding creating another Promise.

  const itemType = returnType.ofType;
  let containsPromise = false;
  const completedResults = Array.from(result, (item, index) => {
    // No need to modify the info object containing the path,
    // since from here on it is not ever accessed by resolver functions.
    const itemPath = addPath(path, index, undefined);

    try {
      let completedItem;

      if (isPromise(item)) {
        completedItem = item.then((resolved) =>
          completeValue(
            exeContext,
            itemType,
            fieldNodes,
            info,
            itemPath,
            resolved,
          ),
        );
      } else {
        completedItem = completeValue(
          exeContext,
          itemType,
          fieldNodes,
          info,
          itemPath,
          item,
        );
      }

      if (isPromise(completedItem)) {
        containsPromise = true; // Note: we don't rely on a `catch` method, but we do expect "thenable"
        // to take a second callback for the error case.

        return completedItem.then(undefined, (rawError) => {
          const error = locatedError(
            rawError,
            fieldNodes,
            pathToArray(itemPath),
          );
          return handleFieldError(error, itemType, exeContext);
        });
      }

      return completedItem;
    } catch (rawError) {
      const error = locatedError(rawError, fieldNodes, pathToArray(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
/**
 * Complete a Scalar or Enum by serializing to a valid value, returning
 * null if serialization is not possible.
 */

function completeLeafValue(returnType, result) {
  const serializedResult = returnType.serialize(result);

  if (serializedResult == null) {
    throw new Error(
      `Expected \`${inspect$1(returnType)}.serialize(${inspect$1(result)})\` to ` +
        `return non-nullable value, returned: ${inspect$1(serializedResult)}`,
    );
  }

  return serializedResult;
}
/**
 * Complete a value of an abstract type by determining the runtime object type
 * of that value, then complete the value for that type.
 */

function completeAbstractValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  var _returnType$resolveTy;

  const resolveTypeFn =
    (_returnType$resolveTy = returnType.resolveType) !== null &&
    _returnType$resolveTy !== void 0
      ? _returnType$resolveTy
      : exeContext.typeResolver;
  const contextValue = exeContext.contextValue;
  const runtimeType = resolveTypeFn(result, contextValue, info, returnType);

  if (isPromise(runtimeType)) {
    return runtimeType.then((resolvedRuntimeType) =>
      completeObjectValue(
        exeContext,
        ensureValidRuntimeType(
          resolvedRuntimeType,
          exeContext,
          returnType,
          fieldNodes,
          info,
          result,
        ),
        fieldNodes,
        info,
        path,
        result,
      ),
    );
  }

  return completeObjectValue(
    exeContext,
    ensureValidRuntimeType(
      runtimeType,
      exeContext,
      returnType,
      fieldNodes,
      info,
      result,
    ),
    fieldNodes,
    info,
    path,
    result,
  );
}

function ensureValidRuntimeType(
  runtimeTypeName,
  exeContext,
  returnType,
  fieldNodes,
  info,
  result,
) {
  if (runtimeTypeName == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
      fieldNodes,
    );
  } // releases before 16.0.0 supported returning `GraphQLObjectType` from `resolveType`
  // TODO: remove in 17.0.0 release

  if (isObjectType(runtimeTypeName)) {
    throw new GraphQLError(
      'Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead.',
    );
  }

  if (typeof runtimeTypeName !== 'string') {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with ` +
        `value ${inspect$1(result)}, received "${inspect$1(runtimeTypeName)}".`,
    );
  }

  const runtimeType = exeContext.schema.getType(runtimeTypeName);

  if (runtimeType == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`,
      {
        nodes: fieldNodes,
      },
    );
  }

  if (!isObjectType(runtimeType)) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`,
      {
        nodes: fieldNodes,
      },
    );
  }

  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new GraphQLError(
      `Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`,
      {
        nodes: fieldNodes,
      },
    );
  }

  return runtimeType;
}
/**
 * Complete an Object value by executing all sub-selections.
 */

function completeObjectValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  // Collect sub-fields to execute to complete this value.
  const subFieldNodes = collectSubfields(exeContext, returnType, fieldNodes); // If there is an isTypeOf predicate function, call it with the
  // current result. If isTypeOf returns false, then raise an error rather
  // than continuing execution.

  if (returnType.isTypeOf) {
    const isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);

    if (isPromise(isTypeOf)) {
      return isTypeOf.then((resolvedIsTypeOf) => {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }

        return executeFields(
          exeContext,
          returnType,
          result,
          path,
          subFieldNodes,
        );
      });
    }

    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }

  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}

function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new GraphQLError(
    `Expected value of type "${returnType.name}" but got: ${inspect$1(result)}.`,
    {
      nodes: fieldNodes,
    },
  );
}
/**
 * If a resolveType function is not given, then a default resolve behavior is
 * used which attempts two strategies:
 *
 * First, See if the provided value has a `__typename` field defined, if so, use
 * that value as name of the resolved type.
 *
 * Otherwise, test each possible type for the abstract type by calling
 * isTypeOf for the object being coerced, returning the first type that matches.
 */

const defaultTypeResolver = function (
  value,
  contextValue,
  info,
  abstractType,
) {
  // First, look for `__typename`.
  if (isObjectLike(value) && typeof value.__typename === 'string') {
    return value.__typename;
  } // Otherwise, test each possible type.

  const possibleTypes = info.schema.getPossibleTypes(abstractType);
  const promisedIsTypeOfResults = [];

  for (let i = 0; i < possibleTypes.length; i++) {
    const type = possibleTypes[i];

    if (type.isTypeOf) {
      const isTypeOfResult = type.isTypeOf(value, contextValue, info);

      if (isPromise(isTypeOfResult)) {
        promisedIsTypeOfResults[i] = isTypeOfResult;
      } else if (isTypeOfResult) {
        return type.name;
      }
    }
  }

  if (promisedIsTypeOfResults.length) {
    return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
      for (let i = 0; i < isTypeOfResults.length; i++) {
        if (isTypeOfResults[i]) {
          return possibleTypes[i].name;
        }
      }
    });
  }
};
/**
 * If a resolve function is not given, then a default resolve behavior is used
 * which takes the property of the source object of the same name as the field
 * and returns it as the result, or if it's a function, returns the result
 * of calling that function while passing along args and context value.
 */

const defaultFieldResolver = function (
  source,
  args,
  contextValue,
  info,
) {
  // ensure source is a value for which property access is acceptable.
  if (isObjectLike(source) || typeof source === 'function') {
    const property = source[info.fieldName];

    if (typeof property === 'function') {
      return source[info.fieldName](args, contextValue, info);
    }

    return property;
  }
};
/**
 * This method looks up the field on the given type definition.
 * It has special casing for the three introspection fields,
 * __schema, __type and __typename. __typename is special because
 * it can always be queried as a field, even in situations where no
 * other fields are allowed, like on a Union. __schema and __type
 * could get automatically added to the query type, but that would
 * require mutating type definitions, which would cause issues.
 *
 * @internal
 */

function getFieldDef(schema, parentType, fieldNode) {
  const fieldName = fieldNode.name.value;

  if (
    fieldName === SchemaMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return SchemaMetaFieldDef;
  } else if (
    fieldName === TypeMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return TypeMetaFieldDef;
  } else if (fieldName === TypeNameMetaFieldDef.name) {
    return TypeNameMetaFieldDef;
  }

  return parentType.getFields()[fieldName];
}

/**
 * Returns true if the provided object implements the AsyncIterator protocol via
 * implementing a `Symbol.asyncIterator` method.
 */
function isAsyncIterable$2(maybeAsyncIterable) {
  return (
    typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0
      ? void 0
      : maybeAsyncIterable[Symbol.asyncIterator]) === 'function'
  );
}

/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator$1(iterable, callback) {
  const iterator = iterable[Symbol.asyncIterator]();

  async function mapResult(result) {
    if (result.done) {
      return result;
    }

    try {
      return {
        value: await callback(result.value),
        done: false,
      };
    } catch (error) {
      /* c8 ignore start */
      // FIXME: add test case
      if (typeof iterator.return === 'function') {
        try {
          await iterator.return();
        } catch (_e) {
          /* ignore error */
        }
      }

      throw error;
      /* c8 ignore stop */
    }
  }

  return {
    async next() {
      return mapResult(await iterator.next());
    },

    async return() {
      // If iterator.return() does not exist, then type R must be undefined.
      return typeof iterator.return === 'function'
        ? mapResult(await iterator.return())
        : {
            value: undefined,
            done: true,
          };
    },

    async throw(error) {
      if (typeof iterator.throw === 'function') {
        return mapResult(await iterator.throw(error));
      }

      throw error;
    },

    [Symbol.asyncIterator]() {
      return this;
    },
  };
}

/**
 * Implements the "Subscribe" algorithm described in the GraphQL specification.
 *
 * Returns a Promise which resolves to either an AsyncIterator (if successful)
 * or an ExecutionResult (error). The promise will be rejected if the schema or
 * other arguments to this function are invalid, or if the resolved event stream
 * is not an async iterable.
 *
 * If the client-provided arguments to this function do not result in a
 * compliant subscription, a GraphQL Response (ExecutionResult) with
 * descriptive errors and no data will be returned.
 *
 * If the source stream could not be created due to faulty subscription
 * resolver logic or underlying systems, the promise will resolve to a single
 * ExecutionResult containing `errors` and no `data`.
 *
 * If the operation succeeded, the promise resolves to an AsyncIterator, which
 * yields a stream of ExecutionResults representing the response stream.
 *
 * Accepts either an object with named arguments, or individual arguments.
 */

async function subscribe(args) {
  // Temporary for v15 to v16 migration. Remove in v17
  arguments.length < 2 ||
    devAssert(
      false,
      'graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.',
    );
  const resultOrStream = await createSourceEventStream(args);

  if (!isAsyncIterable$2(resultOrStream)) {
    return resultOrStream;
  } // For each payload yielded from a subscription, map it over the normal
  // GraphQL `execute` function, with `payload` as the rootValue.
  // This implements the "MapSourceToResponseEvent" algorithm described in
  // the GraphQL specification. The `execute` function provides the
  // "ExecuteSubscriptionEvent" algorithm, as it is nearly identical to the
  // "ExecuteQuery" algorithm, for which `execute` is also used.

  const mapSourceToResponse = (payload) =>
    execute$1({ ...args, rootValue: payload }); // Map every source value to a ExecutionResult value as described above.

  return mapAsyncIterator$1(resultOrStream, mapSourceToResponse);
}

function toNormalizedArgs(args) {
  const firstArg = args[0];

  if (firstArg && 'document' in firstArg) {
    return firstArg;
  }

  return {
    schema: firstArg,
    // FIXME: when underlying TS bug fixed, see https://github.com/microsoft/TypeScript/issues/31613
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    subscribeFieldResolver: args[6],
  };
}
/**
 * Implements the "CreateSourceEventStream" algorithm described in the
 * GraphQL specification, resolving the subscription source event stream.
 *
 * Returns a Promise which resolves to either an AsyncIterable (if successful)
 * or an ExecutionResult (error). The promise will be rejected if the schema or
 * other arguments to this function are invalid, or if the resolved event stream
 * is not an async iterable.
 *
 * If the client-provided arguments to this function do not result in a
 * compliant subscription, a GraphQL Response (ExecutionResult) with
 * descriptive errors and no data will be returned.
 *
 * If the the source stream could not be created due to faulty subscription
 * resolver logic or underlying systems, the promise will resolve to a single
 * ExecutionResult containing `errors` and no `data`.
 *
 * If the operation succeeded, the promise resolves to the AsyncIterable for the
 * event stream returned by the resolver.
 *
 * A Source Event Stream represents a sequence of events, each of which triggers
 * a GraphQL execution for that event.
 *
 * This may be useful when hosting the stateful subscription service in a
 * different process or machine than the stateless GraphQL execution engine,
 * or otherwise separating these two steps. For more on this, see the
 * "Supporting Subscriptions at Scale" information in the GraphQL specification.
 */

async function createSourceEventStream(...rawArgs) {
  const args = toNormalizedArgs(rawArgs);
  const { schema, document, variableValues } = args; // If arguments are missing or incorrectly typed, this is an internal
  // developer mistake which should throw an early error.

  assertValidExecutionArguments(schema, document, variableValues); // If a valid execution context cannot be created due to incorrect arguments,
  // a "Response" with only errors is returned.

  const exeContext = buildExecutionContext(args); // Return early errors if execution context failed.

  if (!('schema' in exeContext)) {
    return {
      errors: exeContext,
    };
  }

  try {
    const eventStream = await executeSubscription(exeContext); // Assert field returned an event stream, otherwise yield an error.

    if (!isAsyncIterable$2(eventStream)) {
      throw new Error(
        'Subscription field must return Async Iterable. ' +
          `Received: ${inspect$1(eventStream)}.`,
      );
    }

    return eventStream;
  } catch (error) {
    // If it GraphQLError, report it as an ExecutionResult, containing only errors and no data.
    // Otherwise treat the error as a system-class error and re-throw it.
    if (error instanceof GraphQLError) {
      return {
        errors: [error],
      };
    }

    throw error;
  }
}

async function executeSubscription(exeContext) {
  const { schema, fragments, operation, variableValues, rootValue } =
    exeContext;
  const rootType = schema.getSubscriptionType();

  if (rootType == null) {
    throw new GraphQLError(
      'Schema is not configured to execute subscription operation.',
      {
        nodes: operation,
      },
    );
  }

  const rootFields = collectFields(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet,
  );
  const [responseName, fieldNodes] = [...rootFields.entries()][0];
  const fieldDef = getFieldDef(schema, rootType, fieldNodes[0]);

  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;
    throw new GraphQLError(
      `The subscription field "${fieldName}" is not defined.`,
      {
        nodes: fieldNodes,
      },
    );
  }

  const path = addPath(undefined, responseName, rootType.name);
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    rootType,
    path,
  );

  try {
    var _fieldDef$subscribe;

    // Implements the "ResolveFieldEventStream" algorithm from GraphQL specification.
    // It differs from "ResolveFieldValue" due to providing a different `resolveFn`.
    // Build a JS object of arguments from the field.arguments AST, using the
    // variables scope to fulfill any variable references.
    const args = getArgumentValues(fieldDef, fieldNodes[0], variableValues); // The resolve function's optional third argument is a context value that
    // is provided to every resolve function within an execution. It is commonly
    // used to represent an authenticated user, or request-specific caches.

    const contextValue = exeContext.contextValue; // Call the `subscribe()` resolver or the default resolver to produce an
    // AsyncIterable yielding raw payloads.

    const resolveFn =
      (_fieldDef$subscribe = fieldDef.subscribe) !== null &&
      _fieldDef$subscribe !== void 0
        ? _fieldDef$subscribe
        : exeContext.subscribeFieldResolver;
    const eventStream = await resolveFn(rootValue, args, contextValue, info);

    if (eventStream instanceof Error) {
      throw eventStream;
    }

    return eventStream;
  } catch (error) {
    throw locatedError(error, fieldNodes, pathToArray(path));
  }
}

/**
 * Returns an operation AST given a document AST and optionally an operation
 * name. If a name is not provided, an operation is only returned if only one is
 * provided in the document.
 */

function getOperationAST(documentAST, operationName) {
  let operation = null;

  for (const definition of documentAST.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;

      if (operationName == null) {
        // If no operation name was provided, only return an Operation if there
        // is one defined in the document. Upon encountering the second, return
        // null.
        if (operation) {
          return null;
        }

        operation = definition;
      } else if (
        ((_definition$name = definition.name) === null ||
        _definition$name === void 0
          ? void 0
          : _definition$name.value) === operationName
      ) {
        return definition;
      }
    }
  }

  return operation;
}

/**
 * @internal
 */

function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;

  // Collect the type definitions and extensions found in the document.
  const typeDefs = [];
  const typeExtensionsMap = Object.create(null); // New directives and types are separate because a directives and types can
  // have the same name. For example, a type named "skip".

  const directiveDefs = [];
  let schemaDef; // Schema extensions are collected which may add additional operation types.

  const schemaExtensions = [];

  for (const def of documentAST.definitions) {
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions
        ? existingTypeExtensions.concat([def])
        : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  } // If this document contains no new types, extensions, or directives then
  // return the same unmodified GraphQLSchema instance.

  if (
    Object.keys(typeExtensionsMap).length === 0 &&
    typeDefs.length === 0 &&
    directiveDefs.length === 0 &&
    schemaExtensions.length === 0 &&
    schemaDef == null
  ) {
    return schemaConfig;
  }

  const typeMap = Object.create(null);

  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }

  for (const typeNode of typeDefs) {
    var _stdTypeMap$name;

    const name = typeNode.name.value;
    typeMap[name] =
      (_stdTypeMap$name = stdTypeMap[name]) !== null &&
      _stdTypeMap$name !== void 0
        ? _stdTypeMap$name
        : buildType(typeNode);
  }

  const operationTypes = {
    // Get the extended root operation types.
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription:
      schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
    // Then, incorporate schema definition and all schema extensions.
    ...(schemaDef && getOperationTypes([schemaDef])),
    ...getOperationTypes(schemaExtensions),
  }; // Then produce and return a Schema config with these types.

  return {
    description:
      (_schemaDef = schemaDef) === null || _schemaDef === void 0
        ? void 0
        : (_schemaDef$descriptio = _schemaDef.description) === null ||
          _schemaDef$descriptio === void 0
        ? void 0
        : _schemaDef$descriptio.value,
    ...operationTypes,
    types: Object.values(typeMap),
    directives: [
      ...schemaConfig.directives.map(replaceDirective),
      ...directiveDefs.map(buildDirective),
    ],
    extensions: Object.create(null),
    astNode:
      (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0
        ? _schemaDef2
        : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid:
      (_options$assumeValid =
        options === null || options === void 0
          ? void 0
          : options.assumeValid) !== null && _options$assumeValid !== void 0
        ? _options$assumeValid
        : false,
  }; // Below are functions used for producing this schema that have closed over
  // this scope and have access to the schema, cache, and newly defined types.

  function replaceType(type) {
    if (isListType(type)) {
      // @ts-expect-error
      return new GraphQLList(replaceType(type.ofType));
    }

    if (isNonNullType(type)) {
      // @ts-expect-error
      return new GraphQLNonNull(replaceType(type.ofType));
    } // @ts-expect-error FIXME

    return replaceNamedType(type);
  }

  function replaceNamedType(type) {
    // Note: While this could make early assertions to get the correctly
    // typed values, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    return typeMap[type.name];
  }

  function replaceDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      args: mapValue(config.args, extendArg),
    });
  }

  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      // Builtin types are not extended.
      return type;
    }

    if (isScalarType(type)) {
      return extendScalarType(type);
    }

    if (isObjectType(type)) {
      return extendObjectType(type);
    }

    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }

    if (isUnionType(type)) {
      return extendUnionType(type);
    }

    if (isEnumType(type)) {
      return extendEnumType(type);
    }

    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    /* c8 ignore next 3 */
    // Not reachable, all possible type definition nodes have been considered.

    invariant$1(false, 'Unexpected type: ' + inspect$1(type));
  }

  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co !== void 0
        ? _typeExtensionsMap$co
        : [];
    return new GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, (field) => ({
          ...field,
          type: replaceType(field.type),
        })),
        ...buildInputFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendEnumType(type) {
    var _typeExtensionsMap$ty;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null &&
      _typeExtensionsMap$ty !== void 0
        ? _typeExtensionsMap$ty
        : [];
    return new GraphQLEnumType({
      ...config,
      values: { ...config.values, ...buildEnumValueMap(extensions) },
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendScalarType(type) {
    var _typeExtensionsMap$co2;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co2 !== void 0
        ? _typeExtensionsMap$co2
        : [];
    let specifiedByURL = config.specifiedByURL;

    for (const extensionNode of extensions) {
      var _getSpecifiedByURL;

      specifiedByURL =
        (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null &&
        _getSpecifiedByURL !== void 0
          ? _getSpecifiedByURL
          : specifiedByURL;
    }

    return new GraphQLScalarType({
      ...config,
      specifiedByURL,
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendObjectType(type) {
    var _typeExtensionsMap$co3;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co3 !== void 0
        ? _typeExtensionsMap$co3
        : [];
    return new GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions),
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co4 !== void 0
        ? _typeExtensionsMap$co4
        : [];
    return new GraphQLInterfaceType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions),
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendUnionType(type) {
    var _typeExtensionsMap$co5;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co5 !== void 0
        ? _typeExtensionsMap$co5
        : [];
    return new GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        ...buildUnionTypes(extensions),
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: field.args && mapValue(field.args, extendArg),
    };
  }

  function extendArg(arg) {
    return { ...arg, type: replaceType(arg.type) };
  }

  function getOperationTypes(nodes) {
    const opTypes = {};

    for (const node of nodes) {
      var _node$operationTypes;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const operationTypesNodes =
        /* c8 ignore next */
        (_node$operationTypes = node.operationTypes) !== null &&
        _node$operationTypes !== void 0
          ? _node$operationTypes
          : [];

      for (const operationType of operationTypesNodes) {
        // Note: While this could make early assertions to get the correctly
        // typed values below, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        // @ts-expect-error
        opTypes[operationType.operation] = getNamedType(operationType.type);
      }
    }

    return opTypes;
  }

  function getNamedType(node) {
    var _stdTypeMap$name2;

    const name = node.name.value;
    const type =
      (_stdTypeMap$name2 = stdTypeMap[name]) !== null &&
      _stdTypeMap$name2 !== void 0
        ? _stdTypeMap$name2
        : typeMap[name];

    if (type === undefined) {
      throw new Error(`Unknown type: "${name}".`);
    }

    return type;
  }

  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }

    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }

    return getNamedType(node);
  }

  function buildDirective(node) {
    var _node$description;

    return new GraphQLDirective({
      name: node.name.value,
      description:
        (_node$description = node.description) === null ||
        _node$description === void 0
          ? void 0
          : _node$description.value,
      // @ts-expect-error
      locations: node.locations.map(({ value }) => value),
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node,
    });
  }

  function buildFieldMap(nodes) {
    const fieldConfigMap = Object.create(null);

    for (const node of nodes) {
      var _node$fields;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const nodeFields =
        /* c8 ignore next */
        (_node$fields = node.fields) !== null && _node$fields !== void 0
          ? _node$fields
          : [];

      for (const field of nodeFields) {
        var _field$description;

        fieldConfigMap[field.name.value] = {
          // Note: While this could make assertions to get the correctly typed
          // value, that would throw immediately while type system validation
          // with validateSchema() will produce more actionable results.
          type: getWrappedType(field.type),
          description:
            (_field$description = field.description) === null ||
            _field$description === void 0
              ? void 0
              : _field$description.value,
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field,
        };
      }
    }

    return fieldConfigMap;
  }

  function buildArgumentMap(args) {
    // FIXME: https://github.com/graphql/graphql-js/issues/2203
    const argsNodes =
      /* c8 ignore next */
      args !== null && args !== void 0 ? args : [];
    const argConfigMap = Object.create(null);

    for (const arg of argsNodes) {
      var _arg$description;

      // Note: While this could make assertions to get the correctly typed
      // value, that would throw immediately while type system validation
      // with validateSchema() will produce more actionable results.
      const type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description:
          (_arg$description = arg.description) === null ||
          _arg$description === void 0
            ? void 0
            : _arg$description.value,
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg,
      };
    }

    return argConfigMap;
  }

  function buildInputFieldMap(nodes) {
    const inputFieldMap = Object.create(null);

    for (const node of nodes) {
      var _node$fields2;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const fieldsNodes =
        /* c8 ignore next */
        (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0
          ? _node$fields2
          : [];

      for (const field of fieldsNodes) {
        var _field$description2;

        // Note: While this could make assertions to get the correctly typed
        // value, that would throw immediately while type system validation
        // with validateSchema() will produce more actionable results.
        const type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description:
            (_field$description2 = field.description) === null ||
            _field$description2 === void 0
              ? void 0
              : _field$description2.value,
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field,
        };
      }
    }

    return inputFieldMap;
  }

  function buildEnumValueMap(nodes) {
    const enumValueMap = Object.create(null);

    for (const node of nodes) {
      var _node$values;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const valuesNodes =
        /* c8 ignore next */
        (_node$values = node.values) !== null && _node$values !== void 0
          ? _node$values
          : [];

      for (const value of valuesNodes) {
        var _value$description;

        enumValueMap[value.name.value] = {
          description:
            (_value$description = value.description) === null ||
            _value$description === void 0
              ? void 0
              : _value$description.value,
          deprecationReason: getDeprecationReason(value),
          astNode: value,
        };
      }
    }

    return enumValueMap;
  }

  function buildInterfaces(nodes) {
    // Note: While this could make assertions to get the correctly typed
    // values below, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    // @ts-expect-error
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$interfaces$map, _node$interfaces;

        return (
          /* c8 ignore next */
          (_node$interfaces$map =
            (_node$interfaces = node.interfaces) === null ||
            _node$interfaces === void 0
              ? void 0
              : _node$interfaces.map(getNamedType)) !== null &&
            _node$interfaces$map !== void 0
            ? _node$interfaces$map
            : []
        );
      },
    );
  }

  function buildUnionTypes(nodes) {
    // Note: While this could make assertions to get the correctly typed
    // values below, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    // @ts-expect-error
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$types$map, _node$types;

        return (
          /* c8 ignore next */
          (_node$types$map =
            (_node$types = node.types) === null || _node$types === void 0
              ? void 0
              : _node$types.map(getNamedType)) !== null &&
            _node$types$map !== void 0
            ? _node$types$map
            : []
        );
      },
    );
  }

  function buildType(astNode) {
    var _typeExtensionsMap$na;

    const name = astNode.name.value;
    const extensionASTNodes =
      (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null &&
      _typeExtensionsMap$na !== void 0
        ? _typeExtensionsMap$na
        : [];

    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var _astNode$description;

        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLObjectType({
          name,
          description:
            (_astNode$description = astNode.description) === null ||
            _astNode$description === void 0
              ? void 0
              : _astNode$description.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _astNode$description2;

        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInterfaceType({
          name,
          description:
            (_astNode$description2 = astNode.description) === null ||
            _astNode$description2 === void 0
              ? void 0
              : _astNode$description2.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case Kind.ENUM_TYPE_DEFINITION: {
        var _astNode$description3;

        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLEnumType({
          name,
          description:
            (_astNode$description3 = astNode.description) === null ||
            _astNode$description3 === void 0
              ? void 0
              : _astNode$description3.value,
          values: buildEnumValueMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case Kind.UNION_TYPE_DEFINITION: {
        var _astNode$description4;

        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLUnionType({
          name,
          description:
            (_astNode$description4 = astNode.description) === null ||
            _astNode$description4 === void 0
              ? void 0
              : _astNode$description4.value,
          types: () => buildUnionTypes(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case Kind.SCALAR_TYPE_DEFINITION: {
        var _astNode$description5;

        return new GraphQLScalarType({
          name,
          description:
            (_astNode$description5 = astNode.description) === null ||
            _astNode$description5 === void 0
              ? void 0
              : _astNode$description5.value,
          specifiedByURL: getSpecifiedByURL(astNode),
          astNode,
          extensionASTNodes,
        });
      }

      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _astNode$description6;

        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInputObjectType({
          name,
          description:
            (_astNode$description6 = astNode.description) === null ||
            _astNode$description6 === void 0
              ? void 0
              : _astNode$description6.value,
          fields: () => buildInputFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }
    }
  }
}
const stdTypeMap = keyMap(
  [...specifiedScalarTypes, ...introspectionTypes],
  (type) => type.name,
);
/**
 * Given a field or enum value node, returns the string value for the
 * deprecation reason.
 */

function getDeprecationReason(node) {
  const deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node); // @ts-expect-error validated by `getDirectiveValues`

  return deprecated === null || deprecated === void 0
    ? void 0
    : deprecated.reason;
}
/**
 * Given a scalar node, returns the string value for the specifiedByURL.
 */

function getSpecifiedByURL(node) {
  const specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node); // @ts-expect-error validated by `getDirectiveValues`

  return specifiedBy === null || specifiedBy === void 0
    ? void 0
    : specifiedBy.url;
}

/**
 * This takes the ast of a schema document produced by the parse function in
 * src/language/parser.js.
 *
 * If no schema definition is provided, then it will look for types named Query,
 * Mutation and Subscription.
 *
 * Given that AST it constructs a GraphQLSchema. The resulting schema
 * has no resolve methods, so execution will use default resolvers.
 */
function buildASTSchema(documentAST, options) {
  (documentAST != null && documentAST.kind === Kind.DOCUMENT) ||
    devAssert(false, 'Must provide valid Document AST.');

  if (
    (options === null || options === void 0 ? void 0 : options.assumeValid) !==
      true &&
    (options === null || options === void 0
      ? void 0
      : options.assumeValidSDL) !== true
  ) {
    assertValidSDL(documentAST);
  }

  const emptySchemaConfig = {
    description: undefined,
    types: [],
    directives: [],
    extensions: Object.create(null),
    extensionASTNodes: [],
    assumeValid: false,
  };
  const config = extendSchemaImpl(emptySchemaConfig, documentAST, options);

  if (config.astNode == null) {
    for (const type of config.types) {
      switch (type.name) {
        // Note: While this could make early assertions to get the correctly
        // typed values below, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        case 'Query':
          // @ts-expect-error validated in `validateSchema`
          config.query = type;
          break;

        case 'Mutation':
          // @ts-expect-error validated in `validateSchema`
          config.mutation = type;
          break;

        case 'Subscription':
          // @ts-expect-error validated in `validateSchema`
          config.subscription = type;
          break;
      }
    }
  }

  const directives = [
    ...config.directives, // If specified directives were not explicitly declared, add them.
    ...specifiedDirectives.filter((stdDirective) =>
      config.directives.every(
        (directive) => directive.name !== stdDirective.name,
      ),
    ),
  ];
  return new GraphQLSchema({ ...config, directives });
}
/**
 * A helper function to build a GraphQLSchema directly from a source
 * document.
 */

function buildSchema(source, options) {
  const document = parse(source, {
    noLocation:
      options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacyFragmentVariables:
      options === null || options === void 0
        ? void 0
        : options.allowLegacyFragmentVariables,
  });
  return buildASTSchema(document, {
    assumeValidSDL:
      options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid:
      options === null || options === void 0 ? void 0 : options.assumeValid,
  });
}

const trackedSchemaSymbol = Symbol('TRACKED_SCHEMA');
const resolversHooksSymbol = Symbol('RESOLVERS_HOOKS');
function prepareTracedSchema(schema) {
    if (!schema || schema[trackedSchemaSymbol]) {
        return;
    }
    schema[trackedSchemaSymbol] = true;
    const entries = Object.values(schema.getTypeMap());
    for (const type of entries) {
        if (!isIntrospectionType(type) && isObjectType(type)) {
            const fields = Object.values(type.getFields());
            for (const field of fields) {
                let resolverFn = (field.resolve || defaultFieldResolver);
                field.resolve = async (root, args, context, info) => {
                    if (context && context[resolversHooksSymbol]) {
                        const hooks = context[resolversHooksSymbol];
                        const afterCalls = [];
                        for (const hook of hooks) {
                            const afterFn = await hook({
                                root,
                                args,
                                context,
                                info,
                                resolverFn,
                                replaceResolverFn: newFn => {
                                    resolverFn = newFn;
                                },
                            });
                            afterFn && afterCalls.push(afterFn);
                        }
                        try {
                            let result = await resolverFn(root, args, context, info);
                            for (const afterFn of afterCalls) {
                                afterFn({
                                    result,
                                    setResult: newResult => {
                                        result = newResult;
                                    },
                                });
                            }
                            return result;
                        }
                        catch (e) {
                            let resultErr = e;
                            for (const afterFn of afterCalls) {
                                afterFn({
                                    result: resultErr,
                                    setResult: newResult => {
                                        resultErr = newResult;
                                    },
                                });
                            }
                            throw resultErr;
                        }
                    }
                    else {
                        return resolverFn(root, args, context, info);
                    }
                };
            }
        }
    }
}

const envelopIsIntrospectionSymbol = Symbol('ENVELOP_IS_INTROSPECTION');
function isIntrospectionOperationString(operation) {
    return (typeof operation === 'string' ? operation : operation.body).indexOf('__schema') !== -1;
}
function getSubscribeArgs(args) {
    return args.length === 1
        ? args[0]
        : {
            schema: args[0],
            document: args[1],
            rootValue: args[2],
            contextValue: args[3],
            variableValues: args[4],
            operationName: args[5],
            fieldResolver: args[6],
            subscribeFieldResolver: args[7],
        };
}
/**
 * Utility function for making a subscribe function that handles polymorphic arguments.
 */
const makeSubscribe = (subscribeFn) => ((...polyArgs) => subscribeFn(getSubscribeArgs(polyArgs)));
function mapAsyncIterator(source, mapper) {
    const iterator = source[Symbol.asyncIterator]();
    async function mapResult(result) {
        var _a;
        if (result.done) {
            return result;
        }
        try {
            return { value: await mapper(result.value), done: false };
        }
        catch (error) {
            try {
                await ((_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator));
            }
            catch (_error) {
                /* ignore error */
            }
            throw error;
        }
    }
    const stream = {
        [Symbol.asyncIterator]() {
            return stream;
        },
        async next() {
            return await mapResult(await iterator.next());
        },
        async return() {
            var _a;
            const promise = (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator);
            return promise ? await mapResult(await promise) : { value: undefined, done: true };
        },
        async throw(error) {
            var _a;
            const promise = (_a = iterator.throw) === null || _a === void 0 ? void 0 : _a.call(iterator);
            if (promise) {
                return await mapResult(await promise);
            }
            // if the source has no throw method we just re-throw error
            // usually throw is not called anyways
            throw error;
        },
    };
    return stream;
}
function getExecuteArgs(args) {
    return args.length === 1
        ? args[0]
        : {
            schema: args[0],
            document: args[1],
            rootValue: args[2],
            contextValue: args[3],
            variableValues: args[4],
            operationName: args[5],
            fieldResolver: args[6],
            typeResolver: args[7],
        };
}
/**
 * Utility function for making a execute function that handles polymorphic arguments.
 */
const makeExecute = (executeFn) => ((...polyArgs) => executeFn(getExecuteArgs(polyArgs)));
/**
 * Returns true if the provided object implements the AsyncIterator protocol via
 * implementing a `Symbol.asyncIterator` method.
 *
 * Source: https://github.com/graphql/graphql-js/blob/main/src/jsutils/isAsyncIterable.ts
 */
function isAsyncIterable$1(maybeAsyncIterable) {
    return (typeof maybeAsyncIterable === 'object' &&
        maybeAsyncIterable != null &&
        typeof maybeAsyncIterable[Symbol.asyncIterator] === 'function');
}
/**
 * A utility function for handling `onExecuteDone` hook result, for simplifying the handling of AsyncIterable returned from `execute`.
 *
 * @param payload The payload send to `onExecuteDone` hook function
 * @param fn The handler to be executed on each result
 * @returns a subscription for streamed results, or undefined in case of an non-async
 */
function handleStreamOrSingleExecutionResult(payload, fn) {
    if (isAsyncIterable$1(payload.result)) {
        return { onNext: fn };
    }
    fn({
        args: payload.args,
        result: payload.result,
        setResult: payload.setResult,
    });
    return undefined;
}
function finalAsyncIterator(source, onFinal) {
    const iterator = source[Symbol.asyncIterator]();
    let isDone = false;
    const stream = {
        [Symbol.asyncIterator]() {
            return stream;
        },
        async next() {
            const result = await iterator.next();
            if (result.done && isDone === false) {
                isDone = true;
                onFinal();
            }
            return result;
        },
        async return() {
            var _a;
            const promise = (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator);
            if (isDone === false) {
                isDone = true;
                onFinal();
            }
            return promise ? await promise : { done: true, value: undefined };
        },
        async throw(error) {
            var _a;
            const promise = (_a = iterator.throw) === null || _a === void 0 ? void 0 : _a.call(iterator);
            if (promise) {
                return await promise;
            }
            // if the source has no throw method we just re-throw error
            // usually throw is not called anyways
            throw error;
        },
    };
    return stream;
}
function errorAsyncIterator(source, onError) {
    const iterator = source[Symbol.asyncIterator]();
    const stream = {
        [Symbol.asyncIterator]() {
            return stream;
        },
        async next() {
            try {
                return await iterator.next();
            }
            catch (error) {
                onError(error);
                return { done: true, value: undefined };
            }
        },
        async return() {
            var _a;
            const promise = (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator);
            return promise ? await promise : { done: true, value: undefined };
        },
        async throw(error) {
            var _a;
            const promise = (_a = iterator.throw) === null || _a === void 0 ? void 0 : _a.call(iterator);
            if (promise) {
                return await promise;
            }
            // if the source has no throw method we just re-throw error
            // usually throw is not called anyways
            throw error;
        },
    };
    return stream;
}

function createEnvelopOrchestrator(plugins) {
    let schema = null;
    let initDone = false;
    const onResolversHandlers = [];
    for (const plugin of plugins) {
        if (plugin.onResolverCalled) {
            onResolversHandlers.push(plugin.onResolverCalled);
        }
    }
    // Define the initial method for replacing the GraphQL schema, this is needed in order
    // to allow setting the schema from the onPluginInit callback. We also need to make sure
    // here not to call the same plugin that initiated the schema switch.
    const replaceSchema = (newSchema, ignorePluginIndex = -1) => {
        if (onResolversHandlers.length) {
            prepareTracedSchema(newSchema);
        }
        schema = newSchema;
        if (initDone) {
            for (const [i, plugin] of plugins.entries()) {
                if (i !== ignorePluginIndex) {
                    plugin.onSchemaChange &&
                        plugin.onSchemaChange({
                            schema,
                            replaceSchema: schemaToSet => {
                                replaceSchema(schemaToSet, i);
                            },
                        });
                }
            }
        }
    };
    const contextErrorHandlers = [];
    // Iterate all plugins and trigger onPluginInit
    for (const [i, plugin] of plugins.entries()) {
        plugin.onPluginInit &&
            plugin.onPluginInit({
                plugins,
                addPlugin: newPlugin => {
                    plugins.push(newPlugin);
                },
                setSchema: modifiedSchema => replaceSchema(modifiedSchema, i),
                registerContextErrorHandler: handler => contextErrorHandlers.push(handler),
            });
    }
    // A set of before callbacks defined here in order to allow it to be used later
    const beforeCallbacks = {
        init: [],
        parse: [],
        validate: [],
        subscribe: [],
        execute: [],
        context: [],
    };
    for (const { onContextBuilding, onExecute, onParse, onSubscribe, onValidate, onEnveloped } of plugins) {
        onEnveloped && beforeCallbacks.init.push(onEnveloped);
        onContextBuilding && beforeCallbacks.context.push(onContextBuilding);
        onExecute && beforeCallbacks.execute.push(onExecute);
        onParse && beforeCallbacks.parse.push(onParse);
        onSubscribe && beforeCallbacks.subscribe.push(onSubscribe);
        onValidate && beforeCallbacks.validate.push(onValidate);
    }
    const init = initialContext => {
        for (const [i, onEnveloped] of beforeCallbacks.init.entries()) {
            onEnveloped({
                context: initialContext,
                extendContext: extension => {
                    if (!initialContext) {
                        return;
                    }
                    Object.assign(initialContext, extension);
                },
                setSchema: modifiedSchema => replaceSchema(modifiedSchema, i),
            });
        }
    };
    const customParse = beforeCallbacks.parse.length
        ? initialContext => (source, parseOptions) => {
            let result = null;
            let parseFn = parse;
            const context = initialContext;
            const afterCalls = [];
            for (const onParse of beforeCallbacks.parse) {
                const afterFn = onParse({
                    context,
                    extendContext: extension => {
                        Object.assign(context, extension);
                    },
                    params: { source, options: parseOptions },
                    parseFn,
                    setParseFn: newFn => {
                        parseFn = newFn;
                    },
                    setParsedDocument: newDoc => {
                        result = newDoc;
                    },
                });
                afterFn && afterCalls.push(afterFn);
            }
            if (result === null) {
                try {
                    result = parseFn(source, parseOptions);
                }
                catch (e) {
                    result = e;
                }
            }
            for (const afterCb of afterCalls) {
                afterCb({
                    context,
                    extendContext: extension => {
                        Object.assign(context, extension);
                    },
                    replaceParseResult: newResult => {
                        result = newResult;
                    },
                    result,
                });
            }
            if (result === null) {
                throw new Error(`Failed to parse document.`);
            }
            if (result instanceof Error) {
                throw result;
            }
            return result;
        }
        : () => parse;
    const customValidate = beforeCallbacks.validate.length
        ? initialContext => (schema, documentAST, rules, typeInfo, validationOptions) => {
            let actualRules = rules ? [...rules] : undefined;
            let validateFn = validate;
            let result = null;
            const context = initialContext;
            const afterCalls = [];
            for (const onValidate of beforeCallbacks.validate) {
                const afterFn = onValidate({
                    context,
                    extendContext: extension => {
                        Object.assign(context, extension);
                    },
                    params: {
                        schema,
                        documentAST,
                        rules: actualRules,
                        typeInfo,
                        options: validationOptions,
                    },
                    validateFn,
                    addValidationRule: rule => {
                        if (!actualRules) {
                            actualRules = [...specifiedRules];
                        }
                        actualRules.push(rule);
                    },
                    setValidationFn: newFn => {
                        validateFn = newFn;
                    },
                    setResult: newResults => {
                        result = newResults;
                    },
                });
                afterFn && afterCalls.push(afterFn);
            }
            if (!result) {
                result = validateFn(schema, documentAST, actualRules, typeInfo, validationOptions);
            }
            const valid = result.length === 0;
            for (const afterCb of afterCalls) {
                afterCb({
                    valid,
                    result,
                    context,
                    extendContext: extension => {
                        Object.assign(context, extension);
                    },
                    setResult: newResult => {
                        result = newResult;
                    },
                });
            }
            return result;
        }
        : () => validate;
    const customContextFactory = beforeCallbacks.context
        .length
        ? initialContext => async (orchestratorCtx) => {
            const afterCalls = [];
            // In order to have access to the "last working" context object we keep this outside of the try block:
            let context = orchestratorCtx ? { ...initialContext, ...orchestratorCtx } : initialContext;
            try {
                let isBreakingContextBuilding = false;
                for (const onContext of beforeCallbacks.context) {
                    const afterHookResult = await onContext({
                        context,
                        extendContext: extension => {
                            context = { ...context, ...extension };
                        },
                        breakContextBuilding: () => {
                            isBreakingContextBuilding = true;
                        },
                    });
                    if (typeof afterHookResult === 'function') {
                        afterCalls.push(afterHookResult);
                    }
                    if (isBreakingContextBuilding === true) {
                        break;
                    }
                }
                for (const afterCb of afterCalls) {
                    afterCb({
                        context,
                        extendContext: extension => {
                            context = { ...context, ...extension };
                        },
                    });
                }
                return context;
            }
            catch (err) {
                let error = err;
                for (const errorCb of contextErrorHandlers) {
                    errorCb({
                        context,
                        error,
                        setError: err => {
                            error = err;
                        },
                    });
                }
                throw error;
            }
        }
        : initialContext => orchestratorCtx => orchestratorCtx ? { ...initialContext, ...orchestratorCtx } : initialContext;
    const useCustomSubscribe = beforeCallbacks.subscribe.length || onResolversHandlers.length;
    const customSubscribe = useCustomSubscribe
        ? makeSubscribe(async (args) => {
            let subscribeFn = subscribe;
            const afterCalls = [];
            const subscribeErrorHandlers = [];
            let context = args.contextValue || {};
            let result;
            for (const onSubscribe of beforeCallbacks.subscribe) {
                const after = await onSubscribe({
                    subscribeFn,
                    setSubscribeFn: newSubscribeFn => {
                        subscribeFn = newSubscribeFn;
                    },
                    extendContext: extension => {
                        context = { ...context, ...extension };
                    },
                    args: args,
                    setResultAndStopExecution: stopResult => {
                        result = stopResult;
                    },
                });
                if (after) {
                    if (after.onSubscribeResult) {
                        afterCalls.push(after.onSubscribeResult);
                    }
                    if (after.onSubscribeError) {
                        subscribeErrorHandlers.push(after.onSubscribeError);
                    }
                }
                if (result !== undefined) {
                    break;
                }
            }
            if (onResolversHandlers.length) {
                context[resolversHooksSymbol] = onResolversHandlers;
            }
            if (result === undefined) {
                result = await subscribeFn({
                    ...args,
                    contextValue: context,
                    // Casted for GraphQL.js 15 compatibility
                    // Can be removed once we drop support for GraphQL.js 15
                });
            }
            const onNextHandler = [];
            const onEndHandler = [];
            for (const afterCb of afterCalls) {
                const hookResult = afterCb({
                    args: args,
                    result,
                    setResult: newResult => {
                        result = newResult;
                    },
                });
                if (hookResult) {
                    if (hookResult.onNext) {
                        onNextHandler.push(hookResult.onNext);
                    }
                    if (hookResult.onEnd) {
                        onEndHandler.push(hookResult.onEnd);
                    }
                }
            }
            if (onNextHandler.length && isAsyncIterable$1(result)) {
                result = mapAsyncIterator(result, async (result) => {
                    for (const onNext of onNextHandler) {
                        await onNext({
                            args: args,
                            result,
                            setResult: newResult => (result = newResult),
                        });
                    }
                    return result;
                });
            }
            if (onEndHandler.length && isAsyncIterable$1(result)) {
                result = finalAsyncIterator(result, () => {
                    for (const onEnd of onEndHandler) {
                        onEnd();
                    }
                });
            }
            if (subscribeErrorHandlers.length && isAsyncIterable$1(result)) {
                result = errorAsyncIterator(result, err => {
                    let error = err;
                    for (const handler of subscribeErrorHandlers) {
                        handler({
                            error,
                            setError: err => {
                                error = err;
                            },
                        });
                    }
                    throw error;
                });
            }
            return result;
        })
        : makeSubscribe(subscribe);
    const useCustomExecute = beforeCallbacks.execute.length || onResolversHandlers.length;
    const customExecute = useCustomExecute
        ? makeExecute(async (args) => {
            let executeFn = execute$1;
            let result;
            const afterCalls = [];
            let context = args.contextValue || {};
            for (const onExecute of beforeCallbacks.execute) {
                const after = await onExecute({
                    executeFn,
                    setExecuteFn: newExecuteFn => {
                        executeFn = newExecuteFn;
                    },
                    setResultAndStopExecution: stopResult => {
                        result = stopResult;
                    },
                    extendContext: extension => {
                        if (typeof extension === 'object') {
                            context = {
                                ...context,
                                ...extension,
                            };
                        }
                        else {
                            throw new Error(`Invalid context extension provided! Expected "object", got: "${JSON.stringify(extension)}" (${typeof extension})`);
                        }
                    },
                    args: args,
                });
                if (after === null || after === void 0 ? void 0 : after.onExecuteDone) {
                    afterCalls.push(after.onExecuteDone);
                }
                if (result !== undefined) {
                    break;
                }
            }
            if (onResolversHandlers.length) {
                context[resolversHooksSymbol] = onResolversHandlers;
            }
            if (result === undefined) {
                result = (await executeFn({
                    ...args,
                    contextValue: context,
                }));
            }
            const onNextHandler = [];
            const onEndHandler = [];
            for (const afterCb of afterCalls) {
                const hookResult = await afterCb({
                    args: args,
                    result,
                    setResult: newResult => {
                        result = newResult;
                    },
                });
                if (hookResult) {
                    if (hookResult.onNext) {
                        onNextHandler.push(hookResult.onNext);
                    }
                    if (hookResult.onEnd) {
                        onEndHandler.push(hookResult.onEnd);
                    }
                }
            }
            if (onNextHandler.length && isAsyncIterable$1(result)) {
                result = mapAsyncIterator(result, async (result) => {
                    for (const onNext of onNextHandler) {
                        await onNext({
                            args: args,
                            result,
                            setResult: newResult => {
                                result = newResult;
                            },
                        });
                    }
                    return result;
                });
            }
            if (onEndHandler.length && isAsyncIterable$1(result)) {
                result = finalAsyncIterator(result, () => {
                    for (const onEnd of onEndHandler) {
                        onEnd();
                    }
                });
            }
            return result;
        })
        : makeExecute(execute$1);
    initDone = true;
    // This is done in order to trigger the first schema available, to allow plugins that needs the schema
    // eagerly to have it.
    if (schema) {
        for (const [i, plugin] of plugins.entries()) {
            plugin.onSchemaChange &&
                plugin.onSchemaChange({
                    schema,
                    replaceSchema: modifiedSchema => replaceSchema(modifiedSchema, i),
                });
        }
    }
    return {
        getCurrentSchema() {
            return schema;
        },
        init,
        parse: customParse,
        validate: customValidate,
        execute: customExecute,
        subscribe: customSubscribe,
        contextFactory: customContextFactory,
    };
}

var _a;
const getTimestamp = typeof globalThis !== 'undefined' && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.performance) === null || _a === void 0 ? void 0 : _a.now)
    ? () => globalThis.performance.now()
    : () => Date.now();
const measure = () => {
    const start = getTimestamp();
    return () => {
        const end = getTimestamp();
        return end - start;
    };
};
const tracingSymbol = Symbol('envelopTracing');
function traceOrchestrator(orchestrator) {
    const createTracer = (name, ctx) => {
        const end = measure();
        return () => {
            ctx[tracingSymbol][name] = end();
        };
    };
    return {
        ...orchestrator,
        init: (ctx = {}) => {
            ctx[tracingSymbol] = ctx[tracingSymbol] || {};
            const done = createTracer('init', ctx || {});
            try {
                return orchestrator.init(ctx);
            }
            finally {
                done();
            }
        },
        parse: (ctx = {}) => {
            ctx[tracingSymbol] = ctx[tracingSymbol] || {};
            const actualFn = orchestrator.parse(ctx);
            return (...args) => {
                const done = createTracer('parse', ctx);
                try {
                    return actualFn(...args);
                }
                finally {
                    done();
                }
            };
        },
        validate: (ctx = {}) => {
            ctx[tracingSymbol] = ctx[tracingSymbol] || {};
            const actualFn = orchestrator.validate(ctx);
            return (...args) => {
                const done = createTracer('validate', ctx);
                try {
                    return actualFn(...args);
                }
                finally {
                    done();
                }
            };
        },
        execute: async (argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) => {
            const args = argsOrSchema instanceof GraphQLSchema
                ? {
                    schema: argsOrSchema,
                    document: document,
                    rootValue,
                    contextValue,
                    variableValues,
                    operationName,
                    fieldResolver,
                    typeResolver,
                }
                : argsOrSchema;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore GraphQL.js types contextValue as unknown
            const done = createTracer('execute', args.contextValue || {});
            try {
                const result = await orchestrator.execute(args);
                done();
                if (!isAsyncIterable$1(result)) {
                    result.extensions = result.extensions || {};
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore GraphQL.js types contextValue as unknown
                    result.extensions.envelopTracing = args.contextValue[tracingSymbol];
                }
                else {
                    // eslint-disable-next-line no-console
                    console.warn(`"traceOrchestrator" encountered a AsyncIterator which is not supported yet, so tracing data is not available for the operation.`);
                }
                return result;
            }
            catch (e) {
                done();
                throw e;
            }
        },
        subscribe: async (argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver) => {
            const args = argsOrSchema instanceof GraphQLSchema
                ? {
                    schema: argsOrSchema,
                    document: document,
                    rootValue,
                    contextValue,
                    variableValues,
                    operationName,
                    fieldResolver,
                    subscribeFieldResolver,
                }
                : argsOrSchema;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore GraphQL.js types contextValue as unknown
            const done = createTracer('subscribe', args.contextValue || {});
            try {
                return await orchestrator.subscribe(args);
            }
            finally {
                done();
            }
        },
        contextFactory: (ctx = {}) => {
            const actualFn = orchestrator.contextFactory(ctx);
            return async (childCtx) => {
                const done = createTracer('contextFactory', ctx);
                try {
                    return await actualFn(childCtx);
                }
                finally {
                    done();
                }
            };
        },
    };
}

function envelop(options) {
    const plugins = options.plugins.filter(isPluginEnabled);
    let orchestrator = createEnvelopOrchestrator(plugins);
    if (options.enableInternalTracing) {
        orchestrator = traceOrchestrator(orchestrator);
    }
    const getEnveloped = (initialContext = {}) => {
        const typedOrchestrator = orchestrator;
        typedOrchestrator.init(initialContext);
        return {
            parse: typedOrchestrator.parse(initialContext),
            validate: typedOrchestrator.validate(initialContext),
            contextFactory: typedOrchestrator.contextFactory(initialContext),
            execute: typedOrchestrator.execute,
            subscribe: typedOrchestrator.subscribe,
            schema: typedOrchestrator.getCurrentSchema(),
        };
    };
    getEnveloped._plugins = plugins;
    return getEnveloped;
}

const DEFAULT_OPTIONS = {
    logFn: console.log,
};
const useLogger = (rawOptions = DEFAULT_OPTIONS) => {
    const options = {
        DEFAULT_OPTIONS,
        ...rawOptions,
    };
    return {
        onParse({ extendContext, params }) {
            if (options.skipIntrospection && isIntrospectionOperationString(params.source)) {
                extendContext({
                    [envelopIsIntrospectionSymbol]: true,
                });
            }
        },
        onExecute({ args }) {
            if (args.contextValue[envelopIsIntrospectionSymbol]) {
                return;
            }
            options.logFn('execute-start', { args });
            return {
                onExecuteDone: ({ result }) => {
                    options.logFn('execute-end', { args, result });
                },
            };
        },
        onSubscribe({ args }) {
            if (args.contextValue[envelopIsIntrospectionSymbol]) {
                return;
            }
            options.logFn('subscribe-start', { args });
            return {
                onSubscribeResult: ({ result }) => {
                    options.logFn('subscribe-end', { args, result });
                },
            };
        },
    };
};

const useSchema = (schema) => {
    return {
        onPluginInit({ setSchema }) {
            setSchema(schema);
        },
    };
};

const useExtendContext = (contextFactory) => ({
    async onContextBuilding({ context, extendContext }) {
        extendContext((await contextFactory(context)));
    },
});

const DEFAULT_ERROR_MESSAGE = 'Unexpected error.';
class EnvelopError extends GraphQLError {
    constructor(message, extensions) {
        super(message, undefined, undefined, undefined, undefined, undefined, extensions);
    }
}
const formatError$1 = (err, message, isDev) => {
    var _a, _b, _c, _d;
    if (err instanceof GraphQLError) {
        if (
        /** execution error */
        (err.originalError && err.originalError instanceof EnvelopError === false) ||
            /** validate and parse errors */
            (err.originalError === undefined && err instanceof EnvelopError === false)) {
            return new GraphQLError(message, err.nodes, err.source, err.positions, err.path, undefined, isDev
                ? {
                    originalError: {
                        message: (_b = (_a = err.originalError) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : err.message,
                        stack: (_d = (_c = err.originalError) === null || _c === void 0 ? void 0 : _c.stack) !== null && _d !== void 0 ? _d : err.stack,
                    },
                }
                : undefined);
        }
        return err;
    }
    return new GraphQLError(message);
};
const makeHandleResult = (format, message, isDev) => ({ result, setResult }) => {
    if (result.errors != null) {
        setResult({ ...result, errors: result.errors.map(error => format(error, message, isDev)) });
    }
};
const useMaskedErrors = (opts) => {
    var _a, _b;
    const format = (_a = opts === null || opts === void 0 ? void 0 : opts.formatError) !== null && _a !== void 0 ? _a : formatError$1;
    const message = (opts === null || opts === void 0 ? void 0 : opts.errorMessage) || DEFAULT_ERROR_MESSAGE;
    // eslint-disable-next-line dot-notation
    const isDev = (_b = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _b !== void 0 ? _b : (typeof process !== 'undefined' ? process.env['NODE_ENV'] === 'development' : false);
    const handleResult = makeHandleResult(format, message, isDev);
    return {
        onParse: (opts === null || opts === void 0 ? void 0 : opts.handleParseErrors) === true
            ? function onParse() {
                return function onParseEnd({ result, replaceParseResult }) {
                    if (result instanceof Error) {
                        replaceParseResult(format(result, message, isDev));
                    }
                };
            }
            : undefined,
        onValidate: (opts === null || opts === void 0 ? void 0 : opts.handleValidationErrors) === true
            ? function onValidate() {
                return function onValidateEnd({ valid, result, setResult }) {
                    if (valid === false) {
                        setResult(result.map(error => format(error, message, isDev)));
                    }
                };
            }
            : undefined,
        onPluginInit(context) {
            context.registerContextErrorHandler(({ error, setError }) => {
                if (error instanceof GraphQLError === false && error instanceof Error) {
                    error = new GraphQLError(error.message, undefined, undefined, undefined, undefined, error);
                }
                setError(format(error, message, isDev));
            });
        },
        onExecute() {
            return {
                onExecuteDone(payload) {
                    return handleStreamOrSingleExecutionResult(payload, handleResult);
                },
            };
        },
        onSubscribe() {
            return {
                onSubscribeResult(payload) {
                    return handleStreamOrSingleExecutionResult(payload, handleResult);
                },
                onSubscribeError({ error, setError }) {
                    setError(format(error, message, isDev));
                },
            };
        },
    };
};

const ANSI_CODES = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    orange: '\x1b[48:5:166m',
};
const titleBold = (msg) => ANSI_CODES.bold + msg + ANSI_CODES.reset;
const LEVEL_COLOR = {
    warn: ANSI_CODES.orange,
    info: ANSI_CODES.cyan,
    error: ANSI_CODES.red,
    debug: ANSI_CODES.magenta,
    title: ANSI_CODES.bold,
    reset: ANSI_CODES.reset,
};
const isDebug = () => typeof process === 'object'
    ? process.env.DEBUG
    : // @ts-expect-error
        typeof DEBUG !== 'undefined'
            ? true
            : false;
const prefix = [LEVEL_COLOR.title, `🧘 Yoga -`, LEVEL_COLOR.reset];
const defaultYogaLogger = {
    debug(...args) {
        if (isDebug()) {
            const fullMessage = [
                `🐛 `,
                ...prefix,
                LEVEL_COLOR.debug,
                ...args,
                LEVEL_COLOR.reset,
            ];
            // Some environments don't have other console methods
            if (console.debug) {
                console.debug(...fullMessage);
            }
            else {
                console.log(...fullMessage);
            }
        }
    },
    info(...args) {
        const fullMessage = [
            `💡 `,
            ...prefix,
            LEVEL_COLOR.info,
            ...args,
            LEVEL_COLOR.reset,
        ];
        if (console.info) {
            console.info(...fullMessage);
        }
        else {
            console.log(...fullMessage);
        }
    },
    warn(...args) {
        const fullMessage = [
            `⚠️ `,
            ...prefix,
            LEVEL_COLOR.warn,
            ...args,
            LEVEL_COLOR.reset,
        ];
        if (console.warn) {
            console.warn(...fullMessage);
        }
        else {
            console.log(...fullMessage);
        }
    },
    error(...args) {
        const fullMessage = [
            `❌ `,
            ...prefix,
            LEVEL_COLOR.error,
            ...args,
            LEVEL_COLOR.reset,
        ];
        if (console.error) {
            console.error(...fullMessage);
        }
        else {
            console.log(...fullMessage);
        }
    },
};

var iterator;
var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	iterator = function (Yallist) {
	  Yallist.prototype[Symbol.iterator] = function* () {
	    for (let walker = this.head; walker; walker = walker.next) {
	      yield walker.value;
	    }
	  };
	};
	return iterator;
}

var yallist = Yallist$1;

Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;

function Yallist$1 (list) {
  var self = this;
  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self
}

Yallist$1.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;

  return next
};

Yallist$1.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }

  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};

Yallist$1.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }

  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};

Yallist$1.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push$1(this, arguments[i]);
  }
  return this.length
};

Yallist$1.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length
};

Yallist$1.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res
};

Yallist$1.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res
};

Yallist$1.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist$1.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist$1.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$1.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value
  }
};

Yallist$1.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res
};

Yallist$1.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res
};

Yallist$1.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc
};

Yallist$1.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc
};

Yallist$1.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr
};

Yallist$1.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr
};

Yallist$1.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$1.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret
};

Yallist$1.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};

Yallist$1.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this
};

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;

  return inserted
}

function push$1 (self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  requireIterator()(Yallist$1);
} catch (er) {}

// A linked list to keep track of recently-used-ness
const Yallist = yallist;

const MAX = Symbol('max');
const LENGTH = Symbol('length');
const LENGTH_CALCULATOR = Symbol('lengthCalculator');
const ALLOW_STALE = Symbol('allowStale');
const MAX_AGE = Symbol('maxAge');
const DISPOSE = Symbol('dispose');
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
const LRU_LIST = Symbol('lruList');
const CACHE = Symbol('cache');
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

const naiveLength = () => 1;

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options };

    if (!options)
      options = {};

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    this[MAX] = options.max || Infinity;

    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key
    this[LRU_LIST] = new Yallist(); // list of items in order of use recency
    this[LENGTH] = 0; // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false
      }

      const node = this[CACHE].get(key);
      const item = node.value;

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge);

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);

      return false
    }

    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit)
  }

  get (key) {
    return get$1(this, key, true)
  }

  peek (key) {
    return get$1(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null

    del(this, node);
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key));
  }

  load (arr) {
    // reset the cache
    this.reset();

    const now = Date.now();
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get$1(this, key, false));
  }
}

const get$1 = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value
  }
};

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
};

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value);

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE])
      hit = undefined;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};

var lruCache = LRUCache;

const DEFAULT_MAX$1 = 1000;
const DEFAULT_TTL$1 = 3600000;
const rawDocumentSymbol = Symbol('rawDocument');
const useValidationCache = (pluginOptions = {}) => {
    const resultCache = typeof pluginOptions.cache !== 'undefined'
        ? pluginOptions.cache
        : new lruCache({
            max: DEFAULT_MAX$1,
            maxAge: DEFAULT_TTL$1,
        });
    return {
        onSchemaChange() {
            var _a, _b;
            if (resultCache.reset) {
                (_a = resultCache.reset) === null || _a === void 0 ? void 0 : _a.call(resultCache);
            }
            else if ('clear' in resultCache) {
                (_b = resultCache.clear) === null || _b === void 0 ? void 0 : _b.call(resultCache);
            }
        },
        onParse({ params, extendContext }) {
            extendContext({ [rawDocumentSymbol]: params.source.toString() });
        },
        onValidate({ params, context, setResult }) {
            var _a;
            const key = (_a = context[rawDocumentSymbol]) !== null && _a !== void 0 ? _a : print(params.documentAST);
            const cachedResult = resultCache.get(key);
            if (cachedResult !== undefined) {
                setResult(cachedResult);
            }
            return ({ result }) => {
                resultCache.set(key, result);
            };
        },
    };
};

const DEFAULT_MAX = 1000;
const DEFAULT_TTL = 3600000;
const useParserCache = (pluginOptions = {}) => {
    const documentCache = typeof pluginOptions.documentCache !== 'undefined'
        ? pluginOptions.documentCache
        : new lruCache({ max: DEFAULT_MAX, maxAge: DEFAULT_TTL });
    const errorCache = typeof pluginOptions.errorCache !== 'undefined'
        ? pluginOptions.errorCache
        : new lruCache({ max: DEFAULT_MAX, maxAge: DEFAULT_TTL });
    return {
        onParse({ params, setParsedDocument }) {
            const { source } = params;
            const key = source instanceof Source ? source.body : source;
            const cachedError = errorCache.get(key);
            if (cachedError !== undefined) {
                throw cachedError;
            }
            const cachedDocument = documentCache.get(key);
            if (cachedDocument !== undefined) {
                setParsedDocument(cachedDocument);
            }
            return ({ result }) => {
                if (result instanceof Error) {
                    errorCache.set(key, result);
                }
                else if (result !== null) {
                    documentCache.set(key, result);
                }
            };
        },
    };
};

const asArray$1 = (fns) => (Array.isArray(fns) ? fns : fns ? [fns] : []);
function compareStrings(a, b) {
    if (String(a) < String(b)) {
        return -1;
    }
    if (String(a) > String(b)) {
        return 1;
    }
    return 0;
}
function nodeToString(a) {
    var _a, _b;
    let name;
    if ('alias' in a) {
        name = (_a = a.alias) === null || _a === void 0 ? void 0 : _a.value;
    }
    if (name == null && 'name' in a) {
        name = (_b = a.name) === null || _b === void 0 ? void 0 : _b.value;
    }
    if (name == null) {
        name = a.kind;
    }
    return name;
}
function compareNodes(a, b, customFn) {
    const aStr = nodeToString(a);
    const bStr = nodeToString(b);
    if (typeof customFn === 'function') {
        return customFn(aStr, bStr);
    }
    return compareStrings(aStr, bStr);
}
function isSome(input) {
    return input != null;
}

function createGraphQLError(message, options) {
    if (versionInfo.major >= 17) {
        return new GraphQLError(message, options);
    }
    return new GraphQLError(message, options === null || options === void 0 ? void 0 : options.nodes, options === null || options === void 0 ? void 0 : options.source, options === null || options === void 0 ? void 0 : options.positions, options === null || options === void 0 ? void 0 : options.path, options === null || options === void 0 ? void 0 : options.originalError, options === null || options === void 0 ? void 0 : options.extensions);
}

let AggregateErrorImpl;
if (typeof AggregateError === 'undefined') {
    class AggregateErrorClass extends Error {
        constructor(errors, message = '') {
            super(message);
            this.errors = errors;
            this.name = 'AggregateError';
            Error.captureStackTrace(this, AggregateErrorClass);
        }
    }
    AggregateErrorImpl = function (errors, message) {
        return new AggregateErrorClass(errors, message);
    };
}
else {
    AggregateErrorImpl = AggregateError;
}
function isAggregateError$1(error) {
    return 'errors' in error && Array.isArray(error['errors']);
}

// Taken from graphql-js
const MAX_RECURSIVE_DEPTH = 3;
/**
 * Used to print values in error messages.
 */
function inspect(value) {
    return formatValue(value, []);
}
function formatValue(value, seenValues) {
    switch (typeof value) {
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? `[function ${value.name}]` : '[function]';
        case 'object':
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatError(value) {
    if (value instanceof GraphQLError) {
        return value.toString();
    }
    return `${value.name}: ${value.message};\n ${value.stack}`;
}
function formatObjectValue(value, previouslySeenValues) {
    if (value === null) {
        return 'null';
    }
    if (value instanceof Error) {
        if (isAggregateError$1(value)) {
            return formatError(value) + '\n' + formatArray(value.errors, previouslySeenValues);
        }
        return formatError(value);
    }
    if (previouslySeenValues.includes(value)) {
        return '[Circular]';
    }
    const seenValues = [...previouslySeenValues, value];
    if (isJSONable(value)) {
        const jsonValue = value.toJSON();
        // check for infinite recursion
        if (jsonValue !== value) {
            return typeof jsonValue === 'string' ? jsonValue : formatValue(jsonValue, seenValues);
        }
    }
    else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function isJSONable(value) {
    return typeof value.toJSON === 'function';
}
function formatObject(object, seenValues) {
    const entries = Object.entries(object);
    if (entries.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    const properties = entries.map(([key, value]) => key + ': ' + formatValue(value, seenValues));
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    const len = array.length;
    const remaining = array.length;
    const items = [];
    for (let i = 0; i < len; ++i) {
        items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
        items.push('... 1 more item');
    }
    else if (remaining > 1) {
        items.push(`... ${remaining} more items`);
    }
    return '[' + items.join(', ') + ']';
}
function getObjectTag(object) {
    const tag = Object.prototype.toString
        .call(object)
        .replace(/^\[object /, '')
        .replace(/]$/, '');
    if (tag === 'Object' && typeof object.constructor === 'function') {
        const name = object.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
        }
    }
    return tag;
}

function getDirectivesInExtensions(node, pathToDirectivesInExtensions = ['directives']) {
    return pathToDirectivesInExtensions.reduce((acc, pathSegment) => (acc == null ? acc : acc[pathSegment]), node === null || node === void 0 ? void 0 : node.extensions);
}

function astFromType(type) {
    if (isNonNullType(type)) {
        const innerType = astFromType(type.ofType);
        if (innerType.kind === Kind.NON_NULL_TYPE) {
            throw new Error(`Invalid type node ${inspect(type)}. Inner type of non-null type cannot be a non-null type.`);
        }
        return {
            kind: Kind.NON_NULL_TYPE,
            type: innerType,
        };
    }
    else if (isListType(type)) {
        return {
            kind: Kind.LIST_TYPE,
            type: astFromType(type.ofType),
        };
    }
    return {
        kind: Kind.NAMED_TYPE,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
    };
}

/**
 * Produces a GraphQL Value AST given a JavaScript object.
 * Function will match JavaScript/JSON values to GraphQL AST schema format
 * by using the following mapping.
 *
 * | JSON Value    | GraphQL Value        |
 * | ------------- | -------------------- |
 * | Object        | Input Object         |
 * | Array         | List                 |
 * | Boolean       | Boolean              |
 * | String        | String               |
 * | Number        | Int / Float          |
 * | null          | NullValue            |
 *
 */
function astFromValueUntyped(value) {
    // only explicit null, not undefined, NaN
    if (value === null) {
        return { kind: Kind.NULL };
    }
    // undefined
    if (value === undefined) {
        return null;
    }
    // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
    // the value is not an array, convert the value using the list's item type.
    if (Array.isArray(value)) {
        const valuesNodes = [];
        for (const item of value) {
            const itemNode = astFromValueUntyped(item);
            if (itemNode != null) {
                valuesNodes.push(itemNode);
            }
        }
        return { kind: Kind.LIST, values: valuesNodes };
    }
    if (typeof value === 'object') {
        const fieldNodes = [];
        for (const fieldName in value) {
            const fieldValue = value[fieldName];
            const ast = astFromValueUntyped(fieldValue);
            if (ast) {
                fieldNodes.push({
                    kind: Kind.OBJECT_FIELD,
                    name: { kind: Kind.NAME, value: fieldName },
                    value: ast,
                });
            }
        }
        return { kind: Kind.OBJECT, fields: fieldNodes };
    }
    // Others serialize based on their corresponding JavaScript scalar types.
    if (typeof value === 'boolean') {
        return { kind: Kind.BOOLEAN, value };
    }
    // JavaScript numbers can be Int or Float values.
    if (typeof value === 'number' && isFinite(value)) {
        const stringNum = String(value);
        return integerStringRegExp.test(stringNum)
            ? { kind: Kind.INT, value: stringNum }
            : { kind: Kind.FLOAT, value: stringNum };
    }
    if (typeof value === 'string') {
        return { kind: Kind.STRING, value };
    }
    throw new TypeError(`Cannot convert value to AST: ${value}.`);
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */
const integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

function memoize1(fn) {
    const memoize1cache = new WeakMap();
    return function memoized(a1) {
        const cachedValue = memoize1cache.get(a1);
        if (cachedValue === undefined) {
            const newValue = fn(a1);
            memoize1cache.set(a1, newValue);
            return newValue;
        }
        return cachedValue;
    };
}

const getRootTypeMap = memoize1(function getRootTypeMap(schema) {
    const rootTypeMap = new Map();
    const queryType = schema.getQueryType();
    if (queryType) {
        rootTypeMap.set('query', queryType);
    }
    const mutationType = schema.getMutationType();
    if (mutationType) {
        rootTypeMap.set('mutation', mutationType);
    }
    const subscriptionType = schema.getSubscriptionType();
    if (subscriptionType) {
        rootTypeMap.set('subscription', subscriptionType);
    }
    return rootTypeMap;
});

function getDocumentNodeFromSchema(schema, options = {}) {
    const pathToDirectivesInExtensions = options.pathToDirectivesInExtensions;
    const typesMap = schema.getTypeMap();
    const schemaNode = astFromSchema(schema, pathToDirectivesInExtensions);
    const definitions = schemaNode != null ? [schemaNode] : [];
    const directives = schema.getDirectives();
    for (const directive of directives) {
        if (isSpecifiedDirective(directive)) {
            continue;
        }
        definitions.push(astFromDirective(directive, schema, pathToDirectivesInExtensions));
    }
    for (const typeName in typesMap) {
        const type = typesMap[typeName];
        const isPredefinedScalar = isSpecifiedScalarType(type);
        const isIntrospection = isIntrospectionType(type);
        if (isPredefinedScalar || isIntrospection) {
            continue;
        }
        if (isObjectType(type)) {
            definitions.push(astFromObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isInterfaceType(type)) {
            definitions.push(astFromInterfaceType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isUnionType(type)) {
            definitions.push(astFromUnionType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isInputObjectType(type)) {
            definitions.push(astFromInputObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isEnumType(type)) {
            definitions.push(astFromEnumType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isScalarType(type)) {
            definitions.push(astFromScalarType(type, schema, pathToDirectivesInExtensions));
        }
        else {
            throw new Error(`Unknown type ${type}.`);
        }
    }
    return {
        kind: Kind.DOCUMENT,
        definitions,
    };
}
function astFromSchema(schema, pathToDirectivesInExtensions) {
    var _a, _b;
    const operationTypeMap = new Map([
        ['query', undefined],
        ['mutation', undefined],
        ['subscription', undefined],
    ]);
    const nodes = [];
    if (schema.astNode != null) {
        nodes.push(schema.astNode);
    }
    if (schema.extensionASTNodes != null) {
        for (const extensionASTNode of schema.extensionASTNodes) {
            nodes.push(extensionASTNode);
        }
    }
    for (const node of nodes) {
        if (node.operationTypes) {
            for (const operationTypeDefinitionNode of node.operationTypes) {
                operationTypeMap.set(operationTypeDefinitionNode.operation, operationTypeDefinitionNode);
            }
        }
    }
    const rootTypeMap = getRootTypeMap(schema);
    for (const [operationTypeNode, operationTypeDefinitionNode] of operationTypeMap) {
        const rootType = rootTypeMap.get(operationTypeNode);
        if (rootType != null) {
            const rootTypeAST = astFromType(rootType);
            if (operationTypeDefinitionNode != null) {
                operationTypeDefinitionNode.type = rootTypeAST;
            }
            else {
                operationTypeMap.set(operationTypeNode, {
                    kind: Kind.OPERATION_TYPE_DEFINITION,
                    operation: operationTypeNode,
                    type: rootTypeAST,
                });
            }
        }
    }
    const operationTypes = [...operationTypeMap.values()].filter(isSome);
    const directives = getDirectiveNodes(schema, schema, pathToDirectivesInExtensions);
    if (!operationTypes.length && !directives.length) {
        return null;
    }
    const schemaNode = {
        kind: operationTypes != null ? Kind.SCHEMA_DEFINITION : Kind.SCHEMA_EXTENSION,
        operationTypes,
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: directives,
    };
    // This code is so weird because it needs to support GraphQL.js 14
    // In GraphQL.js 14 there is no `description` value on schemaNode
    schemaNode.description =
        ((_b = (_a = schema.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : schema.description != null)
            ? {
                kind: Kind.STRING,
                value: schema.description,
                block: true,
            }
            : undefined;
    return schemaNode;
}
function astFromDirective(directive, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c, _d;
    return {
        kind: Kind.DIRECTIVE_DEFINITION,
        description: (_b = (_a = directive.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (directive.description
            ? {
                kind: Kind.STRING,
                value: directive.description,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: directive.name,
        },
        arguments: (_c = directive.args) === null || _c === void 0 ? void 0 : _c.map(arg => astFromArg(arg, schema, pathToDirectivesInExtensions)),
        repeatable: directive.isRepeatable,
        locations: ((_d = directive.locations) === null || _d === void 0 ? void 0 : _d.map(location => ({
            kind: Kind.NAME,
            value: location,
        }))) || [],
    };
}
function getDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    let nodes = [];
    if (entity.astNode != null) {
        nodes.push(entity.astNode);
    }
    if ('extensionASTNodes' in entity && entity.extensionASTNodes != null) {
        nodes = nodes.concat(entity.extensionASTNodes);
    }
    let directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = [];
        for (const node of nodes) {
            if (node.directives) {
                directives.push(...node.directives);
            }
        }
    }
    return directives;
}
function getDeprecatableDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    let directiveNodesBesidesDeprecated = [];
    let deprecatedDirectiveNode = null;
    const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    let directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = (_a = entity.astNode) === null || _a === void 0 ? void 0 : _a.directives;
    }
    if (directives != null) {
        directiveNodesBesidesDeprecated = directives.filter(directive => directive.name.value !== 'deprecated');
        if (entity.deprecationReason != null) {
            deprecatedDirectiveNode = (_b = directives.filter(directive => directive.name.value === 'deprecated')) === null || _b === void 0 ? void 0 : _b[0];
        }
    }
    if (entity.deprecationReason != null &&
        deprecatedDirectiveNode == null) {
        deprecatedDirectiveNode = makeDeprecatedDirective(entity.deprecationReason);
    }
    return deprecatedDirectiveNode == null
        ? directiveNodesBesidesDeprecated
        : [deprecatedDirectiveNode].concat(directiveNodesBesidesDeprecated);
}
function astFromArg(arg, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c;
    return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description: (_b = (_a = arg.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (arg.description
            ? {
                kind: Kind.STRING,
                value: arg.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: arg.name,
        },
        type: astFromType(arg.type),
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        defaultValue: arg.defaultValue !== undefined ? (_c = astFromValue(arg.defaultValue, arg.type)) !== null && _c !== void 0 ? _c : undefined : undefined,
        directives: getDeprecatableDirectiveNodes(arg, schema, pathToDirectivesInExtensions),
    };
}
function astFromObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        description: (_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromField(field, schema, pathToDirectivesInExtensions)),
        interfaces: Object.values(type.getInterfaces()).map(iFace => astFromType(iFace)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromInterfaceType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    const node = {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        description: (_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromField(field, schema, pathToDirectivesInExtensions)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
    if ('getInterfaces' in type) {
        node.interfaces = Object.values(type.getInterfaces()).map(iFace => astFromType(iFace));
    }
    return node;
}
function astFromUnionType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.UNION_TYPE_DEFINITION,
        description: (_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
        types: type.getTypes().map(type => astFromType(type)),
    };
}
function astFromInputObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: (_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromInputField(field, schema, pathToDirectivesInExtensions)),
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromEnumType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.ENUM_TYPE_DEFINITION,
        description: (_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        values: Object.values(type.getValues()).map(value => astFromEnumValue(value, schema, pathToDirectivesInExtensions)),
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromScalarType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c;
    const directivesInExtensions = getDirectivesInExtensions(type, pathToDirectivesInExtensions);
    const directives = directivesInExtensions
        ? makeDirectiveNodes(schema, directivesInExtensions)
        : ((_a = type.astNode) === null || _a === void 0 ? void 0 : _a.directives) || [];
    const specifiedByValue = (type['specifiedByUrl'] || type['specifiedByURL']);
    if (specifiedByValue && !directives.some(directiveNode => directiveNode.name.value === 'specifiedBy')) {
        const specifiedByArgs = {
            url: specifiedByValue,
        };
        directives.push(makeDirectiveNode('specifiedBy', specifiedByArgs));
    }
    return {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        description: (_c = (_b = type.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : (type.description
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: directives,
    };
}
function astFromField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.FIELD_DEFINITION,
        description: (_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (field.description
            ? {
                kind: Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: field.name,
        },
        arguments: field.args.map(arg => astFromArg(arg, schema, pathToDirectivesInExtensions)),
        type: astFromType(field.type),
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
    };
}
function astFromInputField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c;
    return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description: (_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (field.description
            ? {
                kind: Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: field.name,
        },
        type: astFromType(field.type),
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
        defaultValue: (_c = astFromValue(field.defaultValue, field.type)) !== null && _c !== void 0 ? _c : undefined,
    };
}
function astFromEnumValue(value, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.ENUM_VALUE_DEFINITION,
        description: (_b = (_a = value.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (value.description
            ? {
                kind: Kind.STRING,
                value: value.description,
                block: true,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: value.name,
        },
        // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
        directives: getDeprecatableDirectiveNodes(value, schema, pathToDirectivesInExtensions),
    };
}
function makeDeprecatedDirective(deprecationReason) {
    return makeDirectiveNode('deprecated', { reason: deprecationReason }, GraphQLDeprecatedDirective);
}
function makeDirectiveNode(name, args, directive) {
    const directiveArguments = [];
    if (directive != null) {
        for (const arg of directive.args) {
            const argName = arg.name;
            const argValue = args[argName];
            if (argValue !== undefined) {
                const value = astFromValue(argValue, arg.type);
                if (value) {
                    directiveArguments.push({
                        kind: Kind.ARGUMENT,
                        name: {
                            kind: Kind.NAME,
                            value: argName,
                        },
                        value,
                    });
                }
            }
        }
    }
    else {
        for (const argName in args) {
            const argValue = args[argName];
            const value = astFromValueUntyped(argValue);
            if (value) {
                directiveArguments.push({
                    kind: Kind.ARGUMENT,
                    name: {
                        kind: Kind.NAME,
                        value: argName,
                    },
                    value,
                });
            }
        }
    }
    return {
        kind: Kind.DIRECTIVE,
        name: {
            kind: Kind.NAME,
            value: name,
        },
        arguments: directiveArguments,
    };
}
function makeDirectiveNodes(schema, directiveValues) {
    const directiveNodes = [];
    for (const directiveName in directiveValues) {
        const arrayOrSingleValue = directiveValues[directiveName];
        const directive = schema === null || schema === void 0 ? void 0 : schema.getDirective(directiveName);
        if (Array.isArray(arrayOrSingleValue)) {
            for (const value of arrayOrSingleValue) {
                directiveNodes.push(makeDirectiveNode(directiveName, value, directive));
            }
        }
        else {
            directiveNodes.push(makeDirectiveNode(directiveName, arrayOrSingleValue, directive));
        }
    }
    return directiveNodes;
}

const MAX_LINE_LENGTH = 80;
let commentsRegistry = {};
function resetComments() {
    commentsRegistry = {};
}
function collectComment(node) {
    var _a;
    const entityName = (_a = node.name) === null || _a === void 0 ? void 0 : _a.value;
    if (entityName == null) {
        return;
    }
    pushComment(node, entityName);
    switch (node.kind) {
        case 'EnumTypeDefinition':
            if (node.values) {
                for (const value of node.values) {
                    pushComment(value, entityName, value.name.value);
                }
            }
            break;
        case 'ObjectTypeDefinition':
        case 'InputObjectTypeDefinition':
        case 'InterfaceTypeDefinition':
            if (node.fields) {
                for (const field of node.fields) {
                    pushComment(field, entityName, field.name.value);
                    if (isFieldDefinitionNode(field) && field.arguments) {
                        for (const arg of field.arguments) {
                            pushComment(arg, entityName, field.name.value, arg.name.value);
                        }
                    }
                }
            }
            break;
    }
}
function pushComment(node, entity, field, argument) {
    const comment = getComment(node);
    if (typeof comment !== 'string' || comment.length === 0) {
        return;
    }
    const keys = [entity];
    if (field) {
        keys.push(field);
        if (argument) {
            keys.push(argument);
        }
    }
    const path = keys.join('.');
    if (!commentsRegistry[path]) {
        commentsRegistry[path] = [];
    }
    commentsRegistry[path].push(comment);
}
function printComment(comment) {
    return '\n# ' + comment.replace(/\n/g, '\n# ');
}
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * NOTE: ==> This file has been modified just to add comments to the printed AST
 * This is a temp measure, we will move to using the original non modified printer.js ASAP.
 */
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
    return maybeArray ? maybeArray.filter(x => x).join(separator || '') : '';
}
function hasMultilineItems(maybeArray) {
    var _a;
    return (_a = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some(str => str.includes('\n'))) !== null && _a !== void 0 ? _a : false;
}
function addDescription(cb) {
    return (node, _key, _parent, path, ancestors) => {
        var _a;
        const keys = [];
        const parent = path.reduce((prev, key) => {
            if (['fields', 'arguments', 'values'].includes(key) && prev.name) {
                keys.push(prev.name.value);
            }
            return prev[key];
        }, ancestors[0]);
        const key = [...keys, (_a = parent === null || parent === void 0 ? void 0 : parent.name) === null || _a === void 0 ? void 0 : _a.value].filter(Boolean).join('.');
        const items = [];
        if (node.kind.includes('Definition') && commentsRegistry[key]) {
            items.push(...commentsRegistry[key]);
        }
        return join([...items.map(printComment), node.description, cb(node, _key, _parent, path, ancestors)], '\n');
    };
}
function indent(maybeString) {
    return maybeString && `  ${maybeString.replace(/\n/g, '\n  ')}`;
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
    return array && array.length !== 0 ? `{\n${indent(join(array, '\n'))}\n}` : '';
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
    return maybeString ? start + maybeString + (end || '') : '';
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 */
function printBlockString(value, isDescription = false) {
    const escaped = value.replace(/"""/g, '\\"""');
    return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1
        ? `"""${escaped.replace(/"$/, '"\n')}"""`
        : `"""\n${isDescription ? escaped : indent(escaped)}\n"""`;
}
const printDocASTReducer = {
    Name: { leave: node => node.value },
    Variable: { leave: node => '$' + node.name },
    // Document
    Document: {
        leave: node => join(node.definitions, '\n\n'),
    },
    OperationDefinition: {
        leave: node => {
            const varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
            const prefix = join([node.operation, join([node.name, varDefs]), join(node.directives, ' ')], ' ');
            // the query short form.
            return prefix + ' ' + node.selectionSet;
        },
    },
    VariableDefinition: {
        leave: ({ variable, type, defaultValue, directives }) => variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' ')),
    },
    SelectionSet: { leave: ({ selections }) => block(selections) },
    Field: {
        leave({ alias, name, arguments: args, directives, selectionSet }) {
            const prefix = wrap('', alias, ': ') + name;
            let argsLine = prefix + wrap('(', join(args, ', '), ')');
            if (argsLine.length > MAX_LINE_LENGTH) {
                argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
            }
            return join([argsLine, join(directives, ' '), selectionSet], ' ');
        },
    },
    Argument: { leave: ({ name, value }) => name + ': ' + value },
    // Fragments
    FragmentSpread: {
        leave: ({ name, directives }) => '...' + name + wrap(' ', join(directives, ' ')),
    },
    InlineFragment: {
        leave: ({ typeCondition, directives, selectionSet }) => join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' '),
    },
    FragmentDefinition: {
        leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => 
        // Note: fragment variable definitions are experimental and may be changed
        // or removed in the future.
        `fragment ${name}${wrap('(', join(variableDefinitions, ', '), ')')} ` +
            `on ${typeCondition} ${wrap('', join(directives, ' '), ' ')}` +
            selectionSet,
    },
    // Value
    IntValue: { leave: ({ value }) => value },
    FloatValue: { leave: ({ value }) => value },
    StringValue: {
        leave: ({ value, block: isBlockString }) => {
            if (isBlockString) {
                return printBlockString(value);
            }
            return JSON.stringify(value);
        },
    },
    BooleanValue: { leave: ({ value }) => (value ? 'true' : 'false') },
    NullValue: { leave: () => 'null' },
    EnumValue: { leave: ({ value }) => value },
    ListValue: { leave: ({ values }) => '[' + join(values, ', ') + ']' },
    ObjectValue: { leave: ({ fields }) => '{' + join(fields, ', ') + '}' },
    ObjectField: { leave: ({ name, value }) => name + ': ' + value },
    // Directive
    Directive: {
        leave: ({ name, arguments: args }) => '@' + name + wrap('(', join(args, ', '), ')'),
    },
    // Type
    NamedType: { leave: ({ name }) => name },
    ListType: { leave: ({ type }) => '[' + type + ']' },
    NonNullType: { leave: ({ type }) => type + '!' },
    // Type System Definitions
    SchemaDefinition: {
        leave: ({ directives, operationTypes }) => join(['schema', join(directives, ' '), block(operationTypes)], ' '),
    },
    OperationTypeDefinition: {
        leave: ({ operation, type }) => operation + ': ' + type,
    },
    ScalarTypeDefinition: {
        leave: ({ name, directives }) => join(['scalar', name, join(directives, ' ')], ' '),
    },
    ObjectTypeDefinition: {
        leave: ({ name, interfaces, directives, fields }) => join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' '),
    },
    FieldDefinition: {
        leave: ({ name, arguments: args, type, directives }) => name +
            (hasMultilineItems(args)
                ? wrap('(\n', indent(join(args, '\n')), '\n)')
                : wrap('(', join(args, ', '), ')')) +
            ': ' +
            type +
            wrap(' ', join(directives, ' ')),
    },
    InputValueDefinition: {
        leave: ({ name, type, defaultValue, directives }) => join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' '),
    },
    InterfaceTypeDefinition: {
        leave: ({ name, interfaces, directives, fields }) => join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' '),
    },
    UnionTypeDefinition: {
        leave: ({ name, directives, types }) => join(['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))], ' '),
    },
    EnumTypeDefinition: {
        leave: ({ name, directives, values }) => join(['enum', name, join(directives, ' '), block(values)], ' '),
    },
    EnumValueDefinition: {
        leave: ({ name, directives }) => join([name, join(directives, ' ')], ' '),
    },
    InputObjectTypeDefinition: {
        leave: ({ name, directives, fields }) => join(['input', name, join(directives, ' '), block(fields)], ' '),
    },
    DirectiveDefinition: {
        leave: ({ name, arguments: args, repeatable, locations }) => 'directive @' +
            name +
            (hasMultilineItems(args)
                ? wrap('(\n', indent(join(args, '\n')), '\n)')
                : wrap('(', join(args, ', '), ')')) +
            (repeatable ? ' repeatable' : '') +
            ' on ' +
            join(locations, ' | '),
    },
    SchemaExtension: {
        leave: ({ directives, operationTypes }) => join(['extend schema', join(directives, ' '), block(operationTypes)], ' '),
    },
    ScalarTypeExtension: {
        leave: ({ name, directives }) => join(['extend scalar', name, join(directives, ' ')], ' '),
    },
    ObjectTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' '),
    },
    InterfaceTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' '),
    },
    UnionTypeExtension: {
        leave: ({ name, directives, types }) => join(['extend union', name, join(directives, ' '), wrap('= ', join(types, ' | '))], ' '),
    },
    EnumTypeExtension: {
        leave: ({ name, directives, values }) => join(['extend enum', name, join(directives, ' '), block(values)], ' '),
    },
    InputObjectTypeExtension: {
        leave: ({ name, directives, fields }) => join(['extend input', name, join(directives, ' '), block(fields)], ' '),
    },
};
const printDocASTReducerWithComments = Object.keys(printDocASTReducer).reduce((prev, key) => ({
    ...prev,
    [key]: {
        leave: addDescription(printDocASTReducer[key].leave),
    },
}), {});
/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function printWithComments(ast) {
    return visit(ast, printDocASTReducerWithComments);
}
function isFieldDefinitionNode(node) {
    return node.kind === 'FieldDefinition';
}
function getComment(node) {
    const rawValue = getLeadingCommentBlock(node);
    if (rawValue !== undefined) {
        return dedentBlockStringValue(`\n${rawValue}`);
    }
}
function getLeadingCommentBlock(node) {
    const loc = node.loc;
    if (!loc) {
        return;
    }
    const comments = [];
    let token = loc.startToken.prev;
    while (token != null &&
        token.kind === TokenKind.COMMENT &&
        token.next != null &&
        token.prev != null &&
        token.line + 1 === token.next.line &&
        token.line !== token.prev.line) {
        const value = String(token.value);
        comments.push(value);
        token = token.prev;
    }
    return comments.length > 0 ? comments.reverse().join('\n') : undefined;
}
function dedentBlockStringValue(rawString) {
    // Expand a block string's raw value into independent lines.
    const lines = rawString.split(/\r\n|[\n\r]/g);
    // Remove common indentation from all lines but first.
    const commonIndent = getBlockStringIndentation(lines);
    if (commonIndent !== 0) {
        for (let i = 1; i < lines.length; i++) {
            lines[i] = lines[i].slice(commonIndent);
        }
    }
    // Remove leading and trailing blank lines.
    while (lines.length > 0 && isBlank(lines[0])) {
        lines.shift();
    }
    while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
        lines.pop();
    }
    // Return a string of the lines joined with U+000A.
    return lines.join('\n');
}
/**
 * @internal
 */
function getBlockStringIndentation(lines) {
    let commonIndent = null;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const indent = leadingWhitespace(line);
        if (indent === line.length) {
            continue; // skip empty lines
        }
        if (commonIndent === null || indent < commonIndent) {
            commonIndent = indent;
            if (commonIndent === 0) {
                break;
            }
        }
    }
    return commonIndent === null ? 0 : commonIndent;
}
function leadingWhitespace(str) {
    let i = 0;
    while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
        i++;
    }
    return i;
}
function isBlank(str) {
    return leadingWhitespace(str) === str.length;
}

var DirectiveLocation;
(function (DirectiveLocation) {
    /** Request Definitions */
    DirectiveLocation["QUERY"] = "QUERY";
    DirectiveLocation["MUTATION"] = "MUTATION";
    DirectiveLocation["SUBSCRIPTION"] = "SUBSCRIPTION";
    DirectiveLocation["FIELD"] = "FIELD";
    DirectiveLocation["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
    DirectiveLocation["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
    DirectiveLocation["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
    DirectiveLocation["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
    /** Type System Definitions */
    DirectiveLocation["SCHEMA"] = "SCHEMA";
    DirectiveLocation["SCALAR"] = "SCALAR";
    DirectiveLocation["OBJECT"] = "OBJECT";
    DirectiveLocation["FIELD_DEFINITION"] = "FIELD_DEFINITION";
    DirectiveLocation["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
    DirectiveLocation["INTERFACE"] = "INTERFACE";
    DirectiveLocation["UNION"] = "UNION";
    DirectiveLocation["ENUM"] = "ENUM";
    DirectiveLocation["ENUM_VALUE"] = "ENUM_VALUE";
    DirectiveLocation["INPUT_OBJECT"] = "INPUT_OBJECT";
    DirectiveLocation["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
})(DirectiveLocation || (DirectiveLocation = {}));

var MapperKind;
(function (MapperKind) {
    MapperKind["TYPE"] = "MapperKind.TYPE";
    MapperKind["SCALAR_TYPE"] = "MapperKind.SCALAR_TYPE";
    MapperKind["ENUM_TYPE"] = "MapperKind.ENUM_TYPE";
    MapperKind["COMPOSITE_TYPE"] = "MapperKind.COMPOSITE_TYPE";
    MapperKind["OBJECT_TYPE"] = "MapperKind.OBJECT_TYPE";
    MapperKind["INPUT_OBJECT_TYPE"] = "MapperKind.INPUT_OBJECT_TYPE";
    MapperKind["ABSTRACT_TYPE"] = "MapperKind.ABSTRACT_TYPE";
    MapperKind["UNION_TYPE"] = "MapperKind.UNION_TYPE";
    MapperKind["INTERFACE_TYPE"] = "MapperKind.INTERFACE_TYPE";
    MapperKind["ROOT_OBJECT"] = "MapperKind.ROOT_OBJECT";
    MapperKind["QUERY"] = "MapperKind.QUERY";
    MapperKind["MUTATION"] = "MapperKind.MUTATION";
    MapperKind["SUBSCRIPTION"] = "MapperKind.SUBSCRIPTION";
    MapperKind["DIRECTIVE"] = "MapperKind.DIRECTIVE";
    MapperKind["FIELD"] = "MapperKind.FIELD";
    MapperKind["COMPOSITE_FIELD"] = "MapperKind.COMPOSITE_FIELD";
    MapperKind["OBJECT_FIELD"] = "MapperKind.OBJECT_FIELD";
    MapperKind["ROOT_FIELD"] = "MapperKind.ROOT_FIELD";
    MapperKind["QUERY_ROOT_FIELD"] = "MapperKind.QUERY_ROOT_FIELD";
    MapperKind["MUTATION_ROOT_FIELD"] = "MapperKind.MUTATION_ROOT_FIELD";
    MapperKind["SUBSCRIPTION_ROOT_FIELD"] = "MapperKind.SUBSCRIPTION_ROOT_FIELD";
    MapperKind["INTERFACE_FIELD"] = "MapperKind.INTERFACE_FIELD";
    MapperKind["INPUT_OBJECT_FIELD"] = "MapperKind.INPUT_OBJECT_FIELD";
    MapperKind["ARGUMENT"] = "MapperKind.ARGUMENT";
    MapperKind["ENUM_VALUE"] = "MapperKind.ENUM_VALUE";
})(MapperKind || (MapperKind = {}));

function getObjectTypeFromTypeMap(typeMap, type) {
    if (type) {
        const maybeObjectType = typeMap[type.name];
        if (isObjectType(maybeObjectType)) {
            return maybeObjectType;
        }
    }
}

function isNamedStub(type) {
    if ('getFields' in type) {
        const fields = type.getFields();
        // eslint-disable-next-line no-unreachable-loop
        for (const fieldName in fields) {
            const field = fields[fieldName];
            return field.name === '_fake';
        }
    }
    return false;
}
function getBuiltInForStub(type) {
    switch (type.name) {
        case GraphQLInt.name:
            return GraphQLInt;
        case GraphQLFloat.name:
            return GraphQLFloat;
        case GraphQLString.name:
            return GraphQLString;
        case GraphQLBoolean.name:
            return GraphQLBoolean;
        case GraphQLID.name:
            return GraphQLID;
        default:
            return type;
    }
}

function rewireTypes(originalTypeMap, directives) {
    const referenceTypeMap = Object.create(null);
    for (const typeName in originalTypeMap) {
        referenceTypeMap[typeName] = originalTypeMap[typeName];
    }
    const newTypeMap = Object.create(null);
    for (const typeName in referenceTypeMap) {
        const namedType = referenceTypeMap[typeName];
        if (namedType == null || typeName.startsWith('__')) {
            continue;
        }
        const newName = namedType.name;
        if (newName.startsWith('__')) {
            continue;
        }
        if (newTypeMap[newName] != null) {
            console.warn(`Duplicate schema type name ${newName} found; keeping the existing one found in the schema`);
            continue;
        }
        newTypeMap[newName] = namedType;
    }
    for (const typeName in newTypeMap) {
        newTypeMap[typeName] = rewireNamedType(newTypeMap[typeName]);
    }
    const newDirectives = directives.map(directive => rewireDirective(directive));
    return {
        typeMap: newTypeMap,
        directives: newDirectives,
    };
    function rewireDirective(directive) {
        if (isSpecifiedDirective(directive)) {
            return directive;
        }
        const directiveConfig = directive.toConfig();
        directiveConfig.args = rewireArgs(directiveConfig.args);
        return new GraphQLDirective(directiveConfig);
    }
    function rewireArgs(args) {
        const rewiredArgs = {};
        for (const argName in args) {
            const arg = args[argName];
            const rewiredArgType = rewireType(arg.type);
            if (rewiredArgType != null) {
                arg.type = rewiredArgType;
                rewiredArgs[argName] = arg;
            }
        }
        return rewiredArgs;
    }
    function rewireNamedType(type) {
        if (isObjectType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireFields(config.fields),
                interfaces: () => rewireNamedTypes(config.interfaces),
            };
            return new GraphQLObjectType(newConfig);
        }
        else if (isInterfaceType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireFields(config.fields),
            };
            if ('interfaces' in newConfig) {
                newConfig.interfaces = () => rewireNamedTypes(config.interfaces);
            }
            return new GraphQLInterfaceType(newConfig);
        }
        else if (isUnionType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                types: () => rewireNamedTypes(config.types),
            };
            return new GraphQLUnionType(newConfig);
        }
        else if (isInputObjectType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireInputFields(config.fields),
            };
            return new GraphQLInputObjectType(newConfig);
        }
        else if (isEnumType(type)) {
            const enumConfig = type.toConfig();
            return new GraphQLEnumType(enumConfig);
        }
        else if (isScalarType(type)) {
            if (isSpecifiedScalarType(type)) {
                return type;
            }
            const scalarConfig = type.toConfig();
            return new GraphQLScalarType(scalarConfig);
        }
        throw new Error(`Unexpected schema type: ${type}`);
    }
    function rewireFields(fields) {
        const rewiredFields = {};
        for (const fieldName in fields) {
            const field = fields[fieldName];
            const rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null && field.args) {
                field.type = rewiredFieldType;
                field.args = rewireArgs(field.args);
                rewiredFields[fieldName] = field;
            }
        }
        return rewiredFields;
    }
    function rewireInputFields(fields) {
        const rewiredFields = {};
        for (const fieldName in fields) {
            const field = fields[fieldName];
            const rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null) {
                field.type = rewiredFieldType;
                rewiredFields[fieldName] = field;
            }
        }
        return rewiredFields;
    }
    function rewireNamedTypes(namedTypes) {
        const rewiredTypes = [];
        for (const namedType of namedTypes) {
            const rewiredType = rewireType(namedType);
            if (rewiredType != null) {
                rewiredTypes.push(rewiredType);
            }
        }
        return rewiredTypes;
    }
    function rewireType(type) {
        if (isListType(type)) {
            const rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new GraphQLList(rewiredType) : null;
        }
        else if (isNonNullType(type)) {
            const rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new GraphQLNonNull(rewiredType) : null;
        }
        else if (isNamedType(type)) {
            let rewiredType = referenceTypeMap[type.name];
            if (rewiredType === undefined) {
                rewiredType = isNamedStub(type) ? getBuiltInForStub(type) : rewireNamedType(type);
                newTypeMap[rewiredType.name] = referenceTypeMap[type.name] = rewiredType;
            }
            return rewiredType != null ? newTypeMap[rewiredType.name] : null;
        }
        return null;
    }
}

function transformInputValue(type, value, inputLeafValueTransformer = null, inputObjectValueTransformer = null) {
    if (value == null) {
        return value;
    }
    const nullableType = getNullableType(type);
    if (isLeafType(nullableType)) {
        return inputLeafValueTransformer != null ? inputLeafValueTransformer(nullableType, value) : value;
    }
    else if (isListType(nullableType)) {
        return value.map((listMember) => transformInputValue(nullableType.ofType, listMember, inputLeafValueTransformer, inputObjectValueTransformer));
    }
    else if (isInputObjectType(nullableType)) {
        const fields = nullableType.getFields();
        const newValue = {};
        for (const key in value) {
            const field = fields[key];
            if (field != null) {
                newValue[key] = transformInputValue(field.type, value[key], inputLeafValueTransformer, inputObjectValueTransformer);
            }
        }
        return inputObjectValueTransformer != null ? inputObjectValueTransformer(nullableType, newValue) : newValue;
    }
    // unreachable, no other possible return value
}
function serializeInputValue(type, value) {
    return transformInputValue(type, value, (t, v) => {
        try {
            return t.serialize(v);
        }
        catch (_a) {
            return v;
        }
    });
}
function parseInputValue(type, value) {
    return transformInputValue(type, value, (t, v) => {
        try {
            return t.parseValue(v);
        }
        catch (_a) {
            return v;
        }
    });
}

function mapSchema(schema, schemaMapper = {}) {
    const newTypeMap = mapArguments(mapFields(mapTypes(mapDefaultValues(mapEnumValues(mapTypes(mapDefaultValues(schema.getTypeMap(), schema, serializeInputValue), schema, schemaMapper, type => isLeafType(type)), schema, schemaMapper), schema, parseInputValue), schema, schemaMapper, type => !isLeafType(type)), schema, schemaMapper), schema, schemaMapper);
    const originalDirectives = schema.getDirectives();
    const newDirectives = mapDirectives(originalDirectives, schema, schemaMapper);
    const { typeMap, directives } = rewireTypes(newTypeMap, newDirectives);
    return new GraphQLSchema({
        ...schema.toConfig(),
        query: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getQueryType())),
        mutation: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getMutationType())),
        subscription: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getSubscriptionType())),
        types: Object.values(typeMap),
        directives,
    });
}
function mapTypes(originalTypeMap, schema, schemaMapper, testFn = () => true) {
    const newTypeMap = {};
    for (const typeName in originalTypeMap) {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (originalType == null || !testFn(originalType)) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const typeMapper = getTypeMapper(schema, schemaMapper, typeName);
            if (typeMapper == null) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const maybeNewType = typeMapper(originalType, schema);
            if (maybeNewType === undefined) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            newTypeMap[typeName] = maybeNewType;
        }
    }
    return newTypeMap;
}
function mapEnumValues(originalTypeMap, schema, schemaMapper) {
    const enumValueMapper = getEnumValueMapper(schemaMapper);
    if (!enumValueMapper) {
        return originalTypeMap;
    }
    return mapTypes(originalTypeMap, schema, {
        [MapperKind.ENUM_TYPE]: type => {
            const config = type.toConfig();
            const originalEnumValueConfigMap = config.values;
            const newEnumValueConfigMap = {};
            for (const externalValue in originalEnumValueConfigMap) {
                const originalEnumValueConfig = originalEnumValueConfigMap[externalValue];
                const mappedEnumValue = enumValueMapper(originalEnumValueConfig, type.name, schema, externalValue);
                if (mappedEnumValue === undefined) {
                    newEnumValueConfigMap[externalValue] = originalEnumValueConfig;
                }
                else if (Array.isArray(mappedEnumValue)) {
                    const [newExternalValue, newEnumValueConfig] = mappedEnumValue;
                    newEnumValueConfigMap[newExternalValue] =
                        newEnumValueConfig === undefined ? originalEnumValueConfig : newEnumValueConfig;
                }
                else if (mappedEnumValue !== null) {
                    newEnumValueConfigMap[externalValue] = mappedEnumValue;
                }
            }
            return correctASTNodes(new GraphQLEnumType({
                ...config,
                values: newEnumValueConfigMap,
            }));
        },
    }, type => isEnumType(type));
}
function mapDefaultValues(originalTypeMap, schema, fn) {
    const newTypeMap = mapArguments(originalTypeMap, schema, {
        [MapperKind.ARGUMENT]: argumentConfig => {
            if (argumentConfig.defaultValue === undefined) {
                return argumentConfig;
            }
            const maybeNewType = getNewType(originalTypeMap, argumentConfig.type);
            if (maybeNewType != null) {
                return {
                    ...argumentConfig,
                    defaultValue: fn(maybeNewType, argumentConfig.defaultValue),
                };
            }
        },
    });
    return mapFields(newTypeMap, schema, {
        [MapperKind.INPUT_OBJECT_FIELD]: inputFieldConfig => {
            if (inputFieldConfig.defaultValue === undefined) {
                return inputFieldConfig;
            }
            const maybeNewType = getNewType(newTypeMap, inputFieldConfig.type);
            if (maybeNewType != null) {
                return {
                    ...inputFieldConfig,
                    defaultValue: fn(maybeNewType, inputFieldConfig.defaultValue),
                };
            }
        },
    });
}
function getNewType(newTypeMap, type) {
    if (isListType(type)) {
        const newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new GraphQLList(newType) : null;
    }
    else if (isNonNullType(type)) {
        const newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new GraphQLNonNull(newType) : null;
    }
    else if (isNamedType(type)) {
        const newType = newTypeMap[type.name];
        return newType != null ? newType : null;
    }
    return null;
}
function mapFields(originalTypeMap, schema, schemaMapper) {
    const newTypeMap = {};
    for (const typeName in originalTypeMap) {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (!isObjectType(originalType) && !isInterfaceType(originalType) && !isInputObjectType(originalType)) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const fieldMapper = getFieldMapper(schema, schemaMapper, typeName);
            if (fieldMapper == null) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const config = originalType.toConfig();
            const originalFieldConfigMap = config.fields;
            const newFieldConfigMap = {};
            for (const fieldName in originalFieldConfigMap) {
                const originalFieldConfig = originalFieldConfigMap[fieldName];
                const mappedField = fieldMapper(originalFieldConfig, fieldName, typeName, schema);
                if (mappedField === undefined) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                }
                else if (Array.isArray(mappedField)) {
                    const [newFieldName, newFieldConfig] = mappedField;
                    if (newFieldConfig.astNode != null) {
                        newFieldConfig.astNode = {
                            ...newFieldConfig.astNode,
                            name: {
                                ...newFieldConfig.astNode.name,
                                value: newFieldName,
                            },
                        };
                    }
                    newFieldConfigMap[newFieldName] = newFieldConfig === undefined ? originalFieldConfig : newFieldConfig;
                }
                else if (mappedField !== null) {
                    newFieldConfigMap[fieldName] = mappedField;
                }
            }
            if (isObjectType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
            else if (isInterfaceType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new GraphQLInterfaceType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
            else {
                newTypeMap[typeName] = correctASTNodes(new GraphQLInputObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
        }
    }
    return newTypeMap;
}
function mapArguments(originalTypeMap, schema, schemaMapper) {
    const newTypeMap = {};
    for (const typeName in originalTypeMap) {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (!isObjectType(originalType) && !isInterfaceType(originalType)) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const argumentMapper = getArgumentMapper(schemaMapper);
            if (argumentMapper == null) {
                newTypeMap[typeName] = originalType;
                continue;
            }
            const config = originalType.toConfig();
            const originalFieldConfigMap = config.fields;
            const newFieldConfigMap = {};
            for (const fieldName in originalFieldConfigMap) {
                const originalFieldConfig = originalFieldConfigMap[fieldName];
                const originalArgumentConfigMap = originalFieldConfig.args;
                if (originalArgumentConfigMap == null) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                    continue;
                }
                const argumentNames = Object.keys(originalArgumentConfigMap);
                if (!argumentNames.length) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                    continue;
                }
                const newArgumentConfigMap = {};
                for (const argumentName of argumentNames) {
                    const originalArgumentConfig = originalArgumentConfigMap[argumentName];
                    const mappedArgument = argumentMapper(originalArgumentConfig, fieldName, typeName, schema);
                    if (mappedArgument === undefined) {
                        newArgumentConfigMap[argumentName] = originalArgumentConfig;
                    }
                    else if (Array.isArray(mappedArgument)) {
                        const [newArgumentName, newArgumentConfig] = mappedArgument;
                        newArgumentConfigMap[newArgumentName] = newArgumentConfig;
                    }
                    else if (mappedArgument !== null) {
                        newArgumentConfigMap[argumentName] = mappedArgument;
                    }
                }
                newFieldConfigMap[fieldName] = {
                    ...originalFieldConfig,
                    args: newArgumentConfigMap,
                };
            }
            if (isObjectType(originalType)) {
                newTypeMap[typeName] = new GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
            else if (isInterfaceType(originalType)) {
                newTypeMap[typeName] = new GraphQLInterfaceType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
            else {
                newTypeMap[typeName] = new GraphQLInputObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
        }
    }
    return newTypeMap;
}
function mapDirectives(originalDirectives, schema, schemaMapper) {
    const directiveMapper = getDirectiveMapper(schemaMapper);
    if (directiveMapper == null) {
        return originalDirectives.slice();
    }
    const newDirectives = [];
    for (const directive of originalDirectives) {
        const mappedDirective = directiveMapper(directive, schema);
        if (mappedDirective === undefined) {
            newDirectives.push(directive);
        }
        else if (mappedDirective !== null) {
            newDirectives.push(mappedDirective);
        }
    }
    return newDirectives;
}
function getTypeSpecifiers(schema, typeName) {
    var _a, _b, _c;
    const type = schema.getType(typeName);
    const specifiers = [MapperKind.TYPE];
    if (isObjectType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.OBJECT_TYPE);
        if (typeName === ((_a = schema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name)) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.QUERY);
        }
        else if (typeName === ((_b = schema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name)) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.MUTATION);
        }
        else if (typeName === ((_c = schema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name)) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.SUBSCRIPTION);
        }
    }
    else if (isInputObjectType(type)) {
        specifiers.push(MapperKind.INPUT_OBJECT_TYPE);
    }
    else if (isInterfaceType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.INTERFACE_TYPE);
    }
    else if (isUnionType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.UNION_TYPE);
    }
    else if (isEnumType(type)) {
        specifiers.push(MapperKind.ENUM_TYPE);
    }
    else if (isScalarType(type)) {
        specifiers.push(MapperKind.SCALAR_TYPE);
    }
    return specifiers;
}
function getTypeMapper(schema, schemaMapper, typeName) {
    const specifiers = getTypeSpecifiers(schema, typeName);
    let typeMapper;
    const stack = [...specifiers];
    while (!typeMapper && stack.length > 0) {
        // It is safe to use the ! operator here as we check the length.
        const next = stack.pop();
        typeMapper = schemaMapper[next];
    }
    return typeMapper != null ? typeMapper : null;
}
function getFieldSpecifiers(schema, typeName) {
    var _a, _b, _c;
    const type = schema.getType(typeName);
    const specifiers = [MapperKind.FIELD];
    if (isObjectType(type)) {
        specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.OBJECT_FIELD);
        if (typeName === ((_a = schema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name)) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.QUERY_ROOT_FIELD);
        }
        else if (typeName === ((_b = schema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name)) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.MUTATION_ROOT_FIELD);
        }
        else if (typeName === ((_c = schema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name)) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.SUBSCRIPTION_ROOT_FIELD);
        }
    }
    else if (isInterfaceType(type)) {
        specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.INTERFACE_FIELD);
    }
    else if (isInputObjectType(type)) {
        specifiers.push(MapperKind.INPUT_OBJECT_FIELD);
    }
    return specifiers;
}
function getFieldMapper(schema, schemaMapper, typeName) {
    const specifiers = getFieldSpecifiers(schema, typeName);
    let fieldMapper;
    const stack = [...specifiers];
    while (!fieldMapper && stack.length > 0) {
        // It is safe to use the ! operator here as we check the length.
        const next = stack.pop();
        // TODO: fix this as unknown cast
        fieldMapper = schemaMapper[next];
    }
    return fieldMapper !== null && fieldMapper !== void 0 ? fieldMapper : null;
}
function getArgumentMapper(schemaMapper) {
    const argumentMapper = schemaMapper[MapperKind.ARGUMENT];
    return argumentMapper != null ? argumentMapper : null;
}
function getDirectiveMapper(schemaMapper) {
    const directiveMapper = schemaMapper[MapperKind.DIRECTIVE];
    return directiveMapper != null ? directiveMapper : null;
}
function getEnumValueMapper(schemaMapper) {
    const enumValueMapper = schemaMapper[MapperKind.ENUM_VALUE];
    return enumValueMapper != null ? enumValueMapper : null;
}
function correctASTNodes(type) {
    if (isObjectType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            for (const fieldName in config.fields) {
                const fieldConfig = config.fields[fieldName];
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            }
            config.astNode = {
                ...config.astNode,
                kind: Kind.OBJECT_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: Kind.OBJECT_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new GraphQLObjectType(config);
    }
    else if (isInterfaceType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            for (const fieldName in config.fields) {
                const fieldConfig = config.fields[fieldName];
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            }
            config.astNode = {
                ...config.astNode,
                kind: Kind.INTERFACE_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: Kind.INTERFACE_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new GraphQLInterfaceType(config);
    }
    else if (isInputObjectType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            for (const fieldName in config.fields) {
                const fieldConfig = config.fields[fieldName];
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            }
            config.astNode = {
                ...config.astNode,
                kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new GraphQLInputObjectType(config);
    }
    else if (isEnumType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const values = [];
            for (const enumKey in config.values) {
                const enumValueConfig = config.values[enumKey];
                if (enumValueConfig.astNode != null) {
                    values.push(enumValueConfig.astNode);
                }
            }
            config.astNode = {
                ...config.astNode,
                values,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                values: undefined,
            }));
        }
        return new GraphQLEnumType(config);
    }
    else {
        return type;
    }
}

// Update any references to named schema types that disagree with the named
// types found in schema.getTypeMap().
//
// healSchema and its callers (visitSchema/visitSchemaDirectives) all modify the schema in place.
// Therefore, private variables (such as the stored implementation map and the proper root types)
// are not updated.
//
// If this causes issues, the schema could be more aggressively healed as follows:
//
// healSchema(schema);
// const config = schema.toConfig()
// const healedSchema = new GraphQLSchema({
//   ...config,
//   query: schema.getType('<desired new root query type name>'),
//   mutation: schema.getType('<desired new root mutation type name>'),
//   subscription: schema.getType('<desired new root subscription type name>'),
// });
//
// One can then also -- if necessary --  assign the correct private variables to the initial schema
// as follows:
// Object.assign(schema, healedSchema);
//
// These steps are not taken automatically to preserve backwards compatibility with graphql-tools v4.
// See https://github.com/ardatan/graphql-tools/issues/1462
//
// They were briefly taken in v5, but can now be phased out as they were only required when other
// areas of the codebase were using healSchema and visitSchema more extensively.
//
function healSchema(schema) {
    healTypes(schema.getTypeMap(), schema.getDirectives());
    return schema;
}
function healTypes(originalTypeMap, directives) {
    const actualNamedTypeMap = Object.create(null);
    // If any of the .name properties of the GraphQLNamedType objects in
    // schema.getTypeMap() have changed, the keys of the type map need to
    // be updated accordingly.
    for (const typeName in originalTypeMap) {
        const namedType = originalTypeMap[typeName];
        if (namedType == null || typeName.startsWith('__')) {
            continue;
        }
        const actualName = namedType.name;
        if (actualName.startsWith('__')) {
            continue;
        }
        if (actualNamedTypeMap[actualName] != null) {
            console.warn(`Duplicate schema type name ${actualName} found; keeping the existing one found in the schema`);
            continue;
        }
        actualNamedTypeMap[actualName] = namedType;
        // Note: we are deliberately leaving namedType in the schema by its
        // original name (which might be different from actualName), so that
        // references by that name can be healed.
    }
    // Now add back every named type by its actual name.
    for (const typeName in actualNamedTypeMap) {
        const namedType = actualNamedTypeMap[typeName];
        originalTypeMap[typeName] = namedType;
    }
    // Directive declaration argument types can refer to named types.
    for (const decl of directives) {
        decl.args = decl.args.filter(arg => {
            arg.type = healType(arg.type);
            return arg.type !== null;
        });
    }
    for (const typeName in originalTypeMap) {
        const namedType = originalTypeMap[typeName];
        // Heal all named types, except for dangling references, kept only to redirect.
        if (!typeName.startsWith('__') && typeName in actualNamedTypeMap) {
            if (namedType != null) {
                healNamedType(namedType);
            }
        }
    }
    for (const typeName in originalTypeMap) {
        if (!typeName.startsWith('__') && !(typeName in actualNamedTypeMap)) {
            delete originalTypeMap[typeName];
        }
    }
    function healNamedType(type) {
        if (isObjectType(type)) {
            healFields(type);
            healInterfaces(type);
            return;
        }
        else if (isInterfaceType(type)) {
            healFields(type);
            if ('getInterfaces' in type) {
                healInterfaces(type);
            }
            return;
        }
        else if (isUnionType(type)) {
            healUnderlyingTypes(type);
            return;
        }
        else if (isInputObjectType(type)) {
            healInputFields(type);
            return;
        }
        else if (isLeafType(type)) {
            return;
        }
        throw new Error(`Unexpected schema type: ${type}`);
    }
    function healFields(type) {
        const fieldMap = type.getFields();
        for (const [key, field] of Object.entries(fieldMap)) {
            field.args
                .map(arg => {
                arg.type = healType(arg.type);
                return arg.type === null ? null : arg;
            })
                .filter(Boolean);
            field.type = healType(field.type);
            if (field.type === null) {
                delete fieldMap[key];
            }
        }
    }
    function healInterfaces(type) {
        if ('getInterfaces' in type) {
            const interfaces = type.getInterfaces();
            interfaces.push(...interfaces
                .splice(0)
                .map(iface => healType(iface))
                .filter(Boolean));
        }
    }
    function healInputFields(type) {
        const fieldMap = type.getFields();
        for (const [key, field] of Object.entries(fieldMap)) {
            field.type = healType(field.type);
            if (field.type === null) {
                delete fieldMap[key];
            }
        }
    }
    function healUnderlyingTypes(type) {
        const types = type.getTypes();
        types.push(...types
            .splice(0)
            .map(t => healType(t))
            .filter(Boolean));
    }
    function healType(type) {
        // Unwrap the two known wrapper types
        if (isListType(type)) {
            const healedType = healType(type.ofType);
            return healedType != null ? new GraphQLList(healedType) : null;
        }
        else if (isNonNullType(type)) {
            const healedType = healType(type.ofType);
            return healedType != null ? new GraphQLNonNull(healedType) : null;
        }
        else if (isNamedType(type)) {
            // If a type annotation on a field or an argument or a union member is
            // any `GraphQLNamedType` with a `name`, then it must end up identical
            // to `schema.getType(name)`, since `schema.getTypeMap()` is the source
            // of truth for all named schema types.
            // Note that new types can still be simply added by adding a field, as
            // the official type will be undefined, not null.
            const officialType = originalTypeMap[type.name];
            if (officialType && type !== officialType) {
                return officialType;
            }
        }
        return type;
    }
}

function forEachField(schema, fn) {
    const typeMap = schema.getTypeMap();
    for (const typeName in typeMap) {
        const type = typeMap[typeName];
        // TODO: maybe have an option to include these?
        if (!getNamedType(type).name.startsWith('__') && isObjectType(type)) {
            const fields = type.getFields();
            for (const fieldName in fields) {
                const field = fields[fieldName];
                fn(field, typeName, fieldName);
            }
        }
    }
}

function forEachDefaultValue(schema, fn) {
    const typeMap = schema.getTypeMap();
    for (const typeName in typeMap) {
        const type = typeMap[typeName];
        if (!getNamedType(type).name.startsWith('__')) {
            if (isObjectType(type)) {
                const fields = type.getFields();
                for (const fieldName in fields) {
                    const field = fields[fieldName];
                    for (const arg of field.args) {
                        arg.defaultValue = fn(arg.type, arg.defaultValue);
                    }
                }
            }
            else if (isInputObjectType(type)) {
                const fields = type.getFields();
                for (const fieldName in fields) {
                    const field = fields[fieldName];
                    field.defaultValue = fn(field.type, field.defaultValue);
                }
            }
        }
    }
}

function mergeDeep(sources, respectPrototype = false) {
    const target = sources[0] || {};
    const output = {};
    if (respectPrototype) {
        Object.setPrototypeOf(output, Object.create(Object.getPrototypeOf(target)));
    }
    for (const source of sources) {
        if (isObject(target) && isObject(source)) {
            if (respectPrototype) {
                const outputPrototype = Object.getPrototypeOf(output);
                const sourcePrototype = Object.getPrototypeOf(source);
                if (sourcePrototype) {
                    for (const key of Object.getOwnPropertyNames(sourcePrototype)) {
                        const descriptor = Object.getOwnPropertyDescriptor(sourcePrototype, key);
                        if (isSome(descriptor)) {
                            Object.defineProperty(outputPrototype, key, descriptor);
                        }
                    }
                }
            }
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!(key in output)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = mergeDeep([output[key], source[key]], respectPrototype);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            }
        }
    }
    return output;
}
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function isAsyncIterable(value) {
    return (typeof value === 'object' &&
        value != null &&
        Symbol.asyncIterator in value &&
        typeof value[Symbol.asyncIterator] === 'function');
}

function isDocumentNode(object) {
    return object && typeof object === 'object' && 'kind' in object && object.kind === Kind.DOCUMENT;
}

function assertResolversPresent(schema, resolverValidationOptions = {}) {
    const { requireResolversForArgs, requireResolversForNonScalar, requireResolversForAllFields } = resolverValidationOptions;
    if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
        throw new TypeError('requireResolversForAllFields takes precedence over the more specific assertions. ' +
            'Please configure either requireResolversForAllFields or requireResolversForArgs / ' +
            'requireResolversForNonScalar, but not a combination of them.');
    }
    forEachField(schema, (field, typeName, fieldName) => {
        // requires a resolver for *every* field.
        if (requireResolversForAllFields) {
            expectResolver('requireResolversForAllFields', requireResolversForAllFields, field, typeName, fieldName);
        }
        // requires a resolver on every field that has arguments
        if (requireResolversForArgs && field.args.length > 0) {
            expectResolver('requireResolversForArgs', requireResolversForArgs, field, typeName, fieldName);
        }
        // requires a resolver on every field that returns a non-scalar type
        if (requireResolversForNonScalar !== 'ignore' && !isScalarType(getNamedType(field.type))) {
            expectResolver('requireResolversForNonScalar', requireResolversForNonScalar, field, typeName, fieldName);
        }
    });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
    if (!field.resolve) {
        const message = `Resolver missing for "${typeName}.${fieldName}".
To disable this validator, use:
  resolverValidationOptions: {
    ${validator}: 'ignore'
  }`;
        if (behavior === 'error') {
            throw new Error(message);
        }
        if (behavior === 'warn') {
            console.warn(message);
        }
        return;
    }
    if (typeof field.resolve !== 'function') {
        throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`);
    }
}

// If we have any union or interface types throw if no there is no resolveType resolver
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
    mapSchema(schema, {
        [MapperKind.ABSTRACT_TYPE]: type => {
            if (!type.resolveType) {
                const message = `Type "${type.name}" is missing a "__resolveType" resolver. Pass 'ignore' into ` +
                    '"resolverValidationOptions.requireResolversForResolveType" to disable this error.';
                if (requireResolversForResolveType === 'error') {
                    throw new Error(message);
                }
                if (requireResolversForResolveType === 'warn') {
                    console.warn(message);
                }
            }
            return undefined;
        },
    });
}

function extendResolversFromInterfaces(schema, resolvers) {
    const extendedResolvers = {};
    const typeMap = schema.getTypeMap();
    for (const typeName in typeMap) {
        const type = typeMap[typeName];
        if ('getInterfaces' in type) {
            extendedResolvers[typeName] = {};
            for (const iFace of type.getInterfaces()) {
                if (resolvers[iFace.name]) {
                    for (const fieldName in resolvers[iFace.name]) {
                        if (fieldName === '__isTypeOf' || !fieldName.startsWith('__')) {
                            extendedResolvers[typeName][fieldName] = resolvers[iFace.name][fieldName];
                        }
                    }
                }
            }
            const typeResolvers = resolvers[typeName];
            extendedResolvers[typeName] = {
                ...extendedResolvers[typeName],
                ...typeResolvers,
            };
        }
        else {
            const typeResolvers = resolvers[typeName];
            if (typeResolvers != null) {
                extendedResolvers[typeName] = typeResolvers;
            }
        }
    }
    return extendedResolvers;
}

function addResolversToSchema({ schema, resolvers: inputResolvers, defaultFieldResolver, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, }) {
    const { requireResolversToMatchSchema = 'error', requireResolversForResolveType } = resolverValidationOptions;
    const resolvers = inheritResolversFromInterfaces
        ? extendResolversFromInterfaces(schema, inputResolvers)
        : inputResolvers;
    for (const typeName in resolvers) {
        const resolverValue = resolvers[typeName];
        const resolverType = typeof resolverValue;
        if (resolverType !== 'object') {
            throw new Error(`"${typeName}" defined in resolvers, but has invalid value "${resolverValue}". The resolver's value must be of type object.`);
        }
        const type = schema.getType(typeName);
        if (type == null) {
            if (requireResolversToMatchSchema === 'ignore') {
                continue;
            }
            throw new Error(`"${typeName}" defined in resolvers, but not in schema`);
        }
        else if (isSpecifiedScalarType(type)) {
            // allow -- without recommending -- overriding of specified scalar types
            for (const fieldName in resolverValue) {
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                }
                else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        }
        else if (isEnumType(type)) {
            const values = type.getValues();
            for (const fieldName in resolverValue) {
                if (!fieldName.startsWith('__') &&
                    !values.some(value => value.name === fieldName) &&
                    requireResolversToMatchSchema &&
                    requireResolversToMatchSchema !== 'ignore') {
                    throw new Error(`${type.name}.${fieldName} was defined in resolvers, but not present within ${type.name}`);
                }
            }
        }
        else if (isUnionType(type)) {
            for (const fieldName in resolverValue) {
                if (!fieldName.startsWith('__') &&
                    requireResolversToMatchSchema &&
                    requireResolversToMatchSchema !== 'ignore') {
                    throw new Error(`${type.name}.${fieldName} was defined in resolvers, but ${type.name} is not an object or interface type`);
                }
            }
        }
        else if (isObjectType(type) || isInterfaceType(type)) {
            for (const fieldName in resolverValue) {
                if (!fieldName.startsWith('__')) {
                    const fields = type.getFields();
                    const field = fields[fieldName];
                    if (field == null) {
                        // Field present in resolver but not in schema
                        if (requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                            throw new Error(`${typeName}.${fieldName} defined in resolvers, but not in schema`);
                        }
                    }
                    else {
                        // Field present in both the resolver and schema
                        const fieldResolve = resolverValue[fieldName];
                        if (typeof fieldResolve !== 'function' && typeof fieldResolve !== 'object') {
                            throw new Error(`Resolver ${typeName}.${fieldName} must be object or function`);
                        }
                    }
                }
            }
        }
    }
    schema = updateResolversInPlace
        ? addResolversToExistingSchema(schema, resolvers, defaultFieldResolver)
        : createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver);
    if (requireResolversForResolveType && requireResolversForResolveType !== 'ignore') {
        checkForResolveTypeResolver(schema, requireResolversForResolveType);
    }
    return schema;
}
function addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const typeMap = schema.getTypeMap();
    for (const typeName in resolvers) {
        const type = schema.getType(typeName);
        const resolverValue = resolvers[typeName];
        if (isScalarType(type)) {
            for (const fieldName in resolverValue) {
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                }
                else if (fieldName === 'astNode' && type.astNode != null) {
                    type.astNode = {
                        ...type.astNode,
                        description: (_b = (_a = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.astNode.description,
                        directives: ((_c = type.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : []),
                    };
                }
                else if (fieldName === 'extensionASTNodes' && type.extensionASTNodes != null) {
                    type.extensionASTNodes = type.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
                }
                else if (fieldName === 'extensions' &&
                    type.extensions != null &&
                    resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                }
                else {
                    type[fieldName] = resolverValue[fieldName];
                }
            }
        }
        else if (isEnumType(type)) {
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            for (const fieldName in resolverValue) {
                if (fieldName.startsWith('__')) {
                    config[fieldName.substring(2)] = resolverValue[fieldName];
                }
                else if (fieldName === 'astNode' && config.astNode != null) {
                    config.astNode = {
                        ...config.astNode,
                        description: (_h = (_g = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _g === void 0 ? void 0 : _g.description) !== null && _h !== void 0 ? _h : config.astNode.description,
                        directives: ((_j = config.astNode.directives) !== null && _j !== void 0 ? _j : []).concat((_l = (_k = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _k === void 0 ? void 0 : _k.directives) !== null && _l !== void 0 ? _l : []),
                    };
                }
                else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                    config.extensionASTNodes = config.extensionASTNodes.concat((_m = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _m !== void 0 ? _m : []);
                }
                else if (fieldName === 'extensions' &&
                    type.extensions != null &&
                    resolverValue.extensions != null) {
                    type.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                }
                else if (enumValueConfigMap[fieldName]) {
                    enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                }
            }
            typeMap[typeName] = new GraphQLEnumType(config);
        }
        else if (isUnionType(type)) {
            for (const fieldName in resolverValue) {
                if (fieldName.startsWith('__')) {
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                }
            }
        }
        else if (isObjectType(type) || isInterfaceType(type)) {
            for (const fieldName in resolverValue) {
                if (fieldName.startsWith('__')) {
                    // this is for isTypeOf and resolveType and all the other stuff.
                    type[fieldName.substring(2)] = resolverValue[fieldName];
                    continue;
                }
                const fields = type.getFields();
                const field = fields[fieldName];
                if (field != null) {
                    const fieldResolve = resolverValue[fieldName];
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        field.resolve = fieldResolve.bind(resolverValue);
                    }
                    else {
                        setFieldProperties(field, fieldResolve);
                    }
                }
            }
        }
    }
    // serialize all default values prior to healing fields with new scalar/enum types.
    forEachDefaultValue(schema, serializeInputValue);
    // schema may have new scalar/enum types that require healing
    healSchema(schema);
    // reparse all default values with new parsing functions.
    forEachDefaultValue(schema, parseInputValue);
    if (defaultFieldResolver != null) {
        forEachField(schema, field => {
            if (!field.resolve) {
                field.resolve = defaultFieldResolver;
            }
        });
    }
    return schema;
}
function createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver) {
    schema = mapSchema(schema, {
        [MapperKind.SCALAR_TYPE]: type => {
            var _a, _b, _c, _d, _e, _f;
            const config = type.toConfig();
            const resolverValue = resolvers[type.name];
            if (!isSpecifiedScalarType(type) && resolverValue != null) {
                for (const fieldName in resolverValue) {
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                    else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: (_b = (_a = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : config.astNode.description,
                            directives: ((_c = config.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : []),
                        };
                    }
                    else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
                    }
                    else if (fieldName === 'extensions' &&
                        config.extensions != null &&
                        resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    }
                    else {
                        config[fieldName] = resolverValue[fieldName];
                    }
                }
                return new GraphQLScalarType(config);
            }
        },
        [MapperKind.ENUM_TYPE]: type => {
            var _a, _b, _c, _d, _e, _f;
            const resolverValue = resolvers[type.name];
            const config = type.toConfig();
            const enumValueConfigMap = config.values;
            if (resolverValue != null) {
                for (const fieldName in resolverValue) {
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                    else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = {
                            ...config.astNode,
                            description: (_b = (_a = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : config.astNode.description,
                            directives: ((_c = config.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : []),
                        };
                    }
                    else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
                    }
                    else if (fieldName === 'extensions' &&
                        config.extensions != null &&
                        resolverValue.extensions != null) {
                        config.extensions = Object.assign(Object.create(null), type.extensions, resolverValue.extensions);
                    }
                    else if (enumValueConfigMap[fieldName]) {
                        enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                    }
                }
                return new GraphQLEnumType(config);
            }
        },
        [MapperKind.UNION_TYPE]: type => {
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new GraphQLUnionType(config);
            }
        },
        [MapperKind.OBJECT_TYPE]: type => {
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__isTypeOf']) {
                    config.isTypeOf = resolverValue['__isTypeOf'];
                }
                return new GraphQLObjectType(config);
            }
        },
        [MapperKind.INTERFACE_TYPE]: type => {
            const resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                const config = type.toConfig();
                if (resolverValue['__resolveType']) {
                    config.resolveType = resolverValue['__resolveType'];
                }
                return new GraphQLInterfaceType(config);
            }
        },
        [MapperKind.COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName) => {
            const resolverValue = resolvers[typeName];
            if (resolverValue != null) {
                const fieldResolve = resolverValue[fieldName];
                if (fieldResolve != null) {
                    const newFieldConfig = { ...fieldConfig };
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        newFieldConfig.resolve = fieldResolve.bind(resolverValue);
                    }
                    else {
                        setFieldProperties(newFieldConfig, fieldResolve);
                    }
                    return newFieldConfig;
                }
            }
        },
    });
    if (defaultFieldResolver != null) {
        schema = mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: fieldConfig => ({
                ...fieldConfig,
                resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver,
            }),
        });
    }
    return schema;
}
function setFieldProperties(field, propertiesObj) {
    for (const propertyName in propertiesObj) {
        field[propertyName] = propertiesObj[propertyName];
    }
}

/**
 * Deep merges multiple resolver definition objects into a single definition.
 * @param resolversDefinitions Resolver definitions to be merged
 * @param options Additional options
 *
 * ```js
 * const { mergeResolvers } = require('@graphql-tools/merge');
 * const clientResolver = require('./clientResolver');
 * const productResolver = require('./productResolver');
 *
 * const resolvers = mergeResolvers([
 *  clientResolver,
 *  productResolver,
 * ]);
 * ```
 *
 * If you don't want to manually create the array of resolver objects, you can
 * also use this function along with loadFiles:
 *
 * ```js
 * const path = require('path');
 * const { mergeResolvers } = require('@graphql-tools/merge');
 * const { loadFilesSync } = require('@graphql-tools/load-files');
 *
 * const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
 *
 * const resolvers = mergeResolvers(resolversArray)
 * ```
 */
function mergeResolvers(resolversDefinitions, options) {
    if (!resolversDefinitions || (Array.isArray(resolversDefinitions) && resolversDefinitions.length === 0)) {
        return {};
    }
    if (!Array.isArray(resolversDefinitions)) {
        return resolversDefinitions;
    }
    if (resolversDefinitions.length === 1) {
        return resolversDefinitions[0] || {};
    }
    const resolvers = new Array();
    for (let resolversDefinition of resolversDefinitions) {
        if (Array.isArray(resolversDefinition)) {
            resolversDefinition = mergeResolvers(resolversDefinition);
        }
        if (typeof resolversDefinition === 'object' && resolversDefinition) {
            resolvers.push(resolversDefinition);
        }
    }
    const result = mergeDeep(resolvers, true);
    if (options === null || options === void 0 ? void 0 : options.exclusions) {
        for (const exclusion of options.exclusions) {
            const [typeName, fieldName] = exclusion.split('.');
            if (!fieldName || fieldName === '*') {
                delete result[typeName];
            }
            else if (result[typeName]) {
                delete result[typeName][fieldName];
            }
        }
    }
    return result;
}

function mergeArguments$1(args1, args2, config) {
    const result = deduplicateArguments([...args2, ...args1].filter(isSome));
    if (config && config.sort) {
        result.sort(compareNodes);
    }
    return result;
}
function deduplicateArguments(args) {
    return args.reduce((acc, current) => {
        const dup = acc.find(arg => arg.name.value === current.name.value);
        if (!dup) {
            return acc.concat([current]);
        }
        return acc;
    }, []);
}

function directiveAlreadyExists(directivesArr, otherDirective) {
    return !!directivesArr.find(directive => directive.name.value === otherDirective.name.value);
}
function nameAlreadyExists(name, namesArr) {
    return namesArr.some(({ value }) => value === name.value);
}
function mergeArguments(a1, a2) {
    const result = [...a2];
    for (const argument of a1) {
        const existingIndex = result.findIndex(a => a.name.value === argument.name.value);
        if (existingIndex > -1) {
            const existingArg = result[existingIndex];
            if (existingArg.value.kind === 'ListValue') {
                const source = existingArg.value.values;
                const target = argument.value.values;
                // merge values of two lists
                existingArg.value.values = deduplicateLists(source, target, (targetVal, source) => {
                    const value = targetVal.value;
                    return !value || !source.some((sourceVal) => sourceVal.value === value);
                });
            }
            else {
                existingArg.value = argument.value;
            }
        }
        else {
            result.push(argument);
        }
    }
    return result;
}
function deduplicateDirectives(directives) {
    return directives
        .map((directive, i, all) => {
        const firstAt = all.findIndex(d => d.name.value === directive.name.value);
        if (firstAt !== i) {
            const dup = all[firstAt];
            directive.arguments = mergeArguments(directive.arguments, dup.arguments);
            return null;
        }
        return directive;
    })
        .filter(isSome);
}
function mergeDirectives(d1 = [], d2 = [], config) {
    const reverseOrder = config && config.reverseDirectives;
    const asNext = reverseOrder ? d1 : d2;
    const asFirst = reverseOrder ? d2 : d1;
    const result = deduplicateDirectives([...asNext]);
    for (const directive of asFirst) {
        if (directiveAlreadyExists(result, directive)) {
            const existingDirectiveIndex = result.findIndex(d => d.name.value === directive.name.value);
            const existingDirective = result[existingDirectiveIndex];
            result[existingDirectiveIndex].arguments = mergeArguments(directive.arguments || [], existingDirective.arguments || []);
        }
        else {
            result.push(directive);
        }
    }
    return result;
}
function validateInputs(node, existingNode) {
    const printedNode = print({
        ...node,
        description: undefined,
    });
    const printedExistingNode = print({
        ...existingNode,
        description: undefined,
    });
    // eslint-disable-next-line
    const leaveInputs = new RegExp('(directive @w*d*)|( on .*$)', 'g');
    const sameArguments = printedNode.replace(leaveInputs, '') === printedExistingNode.replace(leaveInputs, '');
    if (!sameArguments) {
        throw new Error(`Unable to merge GraphQL directive "${node.name.value}". \nExisting directive:  \n\t${printedExistingNode} \nReceived directive: \n\t${printedNode}`);
    }
}
function mergeDirective(node, existingNode) {
    if (existingNode) {
        validateInputs(node, existingNode);
        return {
            ...node,
            locations: [
                ...existingNode.locations,
                ...node.locations.filter(name => !nameAlreadyExists(name, existingNode.locations)),
            ],
        };
    }
    return node;
}
function deduplicateLists(source, target, filterFn) {
    return source.concat(target.filter(val => filterFn(val, source)));
}

function mergeEnumValues(first, second, config) {
    if (config === null || config === void 0 ? void 0 : config.consistentEnumMerge) {
        const reversed = [];
        if (first) {
            reversed.push(...first);
        }
        first = second;
        second = reversed;
    }
    const enumValueMap = new Map();
    if (first) {
        for (const firstValue of first) {
            enumValueMap.set(firstValue.name.value, firstValue);
        }
    }
    if (second) {
        for (const secondValue of second) {
            const enumValue = secondValue.name.value;
            if (enumValueMap.has(enumValue)) {
                const firstValue = enumValueMap.get(enumValue);
                firstValue.description = secondValue.description || firstValue.description;
                firstValue.directives = mergeDirectives(secondValue.directives, firstValue.directives);
            }
            else {
                enumValueMap.set(enumValue, secondValue);
            }
        }
    }
    const result = [...enumValueMap.values()];
    if (config && config.sort) {
        result.sort(compareNodes);
    }
    return result;
}

function mergeEnum(e1, e2, config) {
    if (e2) {
        return {
            name: e1.name,
            description: e1['description'] || e2['description'],
            kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || e1.kind === 'EnumTypeDefinition' || e2.kind === 'EnumTypeDefinition'
                ? 'EnumTypeDefinition'
                : 'EnumTypeExtension',
            loc: e1.loc,
            directives: mergeDirectives(e1.directives, e2.directives, config),
            values: mergeEnumValues(e1.values, e2.values, config),
        };
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...e1,
            kind: Kind.ENUM_TYPE_DEFINITION,
        }
        : e1;
}

function isStringTypes(types) {
    return typeof types === 'string';
}
function isSourceTypes(types) {
    return types instanceof Source;
}
function extractType(type) {
    let visitedType = type;
    while (visitedType.kind === Kind.LIST_TYPE || visitedType.kind === 'NonNullType') {
        visitedType = visitedType.type;
    }
    return visitedType;
}
function isWrappingTypeNode(type) {
    return type.kind !== Kind.NAMED_TYPE;
}
function isListTypeNode(type) {
    return type.kind === Kind.LIST_TYPE;
}
function isNonNullTypeNode(type) {
    return type.kind === Kind.NON_NULL_TYPE;
}
function printTypeNode(type) {
    if (isListTypeNode(type)) {
        return `[${printTypeNode(type.type)}]`;
    }
    if (isNonNullTypeNode(type)) {
        return `${printTypeNode(type.type)}!`;
    }
    return type.name.value;
}
var CompareVal;
(function (CompareVal) {
    CompareVal[CompareVal["A_SMALLER_THAN_B"] = -1] = "A_SMALLER_THAN_B";
    CompareVal[CompareVal["A_EQUALS_B"] = 0] = "A_EQUALS_B";
    CompareVal[CompareVal["A_GREATER_THAN_B"] = 1] = "A_GREATER_THAN_B";
})(CompareVal || (CompareVal = {}));
function defaultStringComparator(a, b) {
    if (a == null && b == null) {
        return CompareVal.A_EQUALS_B;
    }
    if (a == null) {
        return CompareVal.A_SMALLER_THAN_B;
    }
    if (b == null) {
        return CompareVal.A_GREATER_THAN_B;
    }
    if (a < b)
        return CompareVal.A_SMALLER_THAN_B;
    if (a > b)
        return CompareVal.A_GREATER_THAN_B;
    return CompareVal.A_EQUALS_B;
}

function fieldAlreadyExists(fieldsArr, otherField, config) {
    const result = fieldsArr.find(field => field.name.value === otherField.name.value);
    if (result && !(config === null || config === void 0 ? void 0 : config.ignoreFieldConflicts)) {
        const t1 = extractType(result.type);
        const t2 = extractType(otherField.type);
        if (t1.name.value !== t2.name.value) {
            throw new Error(`Field "${otherField.name.value}" already defined with a different type. Declared as "${t1.name.value}", but you tried to override with "${t2.name.value}"`);
        }
    }
    return !!result;
}
function mergeFields(type, f1, f2, config) {
    const result = [];
    if (f2 != null) {
        result.push(...f2);
    }
    if (f1 != null) {
        for (const field of f1) {
            if (fieldAlreadyExists(result, field, config)) {
                const existing = result.find((f) => f.name.value === field.name.value);
                if (!(config === null || config === void 0 ? void 0 : config.ignoreFieldConflicts)) {
                    if (config === null || config === void 0 ? void 0 : config.throwOnConflict) {
                        preventConflicts(type, existing, field, false);
                    }
                    else {
                        preventConflicts(type, existing, field, true);
                    }
                    if (isNonNullTypeNode(field.type) && !isNonNullTypeNode(existing.type)) {
                        existing.type = field.type;
                    }
                }
                existing.arguments = mergeArguments$1(field['arguments'] || [], existing.arguments || [], config);
                existing.directives = mergeDirectives(field.directives, existing.directives, config);
                existing.description = field.description || existing.description;
            }
            else {
                result.push(field);
            }
        }
    }
    if (config && config.sort) {
        result.sort(compareNodes);
    }
    if (config && config.exclusions) {
        const exclusions = config.exclusions;
        return result.filter(field => !exclusions.includes(`${type.name.value}.${field.name.value}`));
    }
    return result;
}
function preventConflicts(type, a, b, ignoreNullability = false) {
    const aType = printTypeNode(a.type);
    const bType = printTypeNode(b.type);
    if (aType !== bType && !safeChangeForFieldType(a.type, b.type, ignoreNullability)) {
        throw new Error(`Field '${type.name.value}.${a.name.value}' changed type from '${aType}' to '${bType}'`);
    }
}
function safeChangeForFieldType(oldType, newType, ignoreNullability = false) {
    // both are named
    if (!isWrappingTypeNode(oldType) && !isWrappingTypeNode(newType)) {
        return oldType.toString() === newType.toString();
    }
    // new is non-null
    if (isNonNullTypeNode(newType)) {
        const ofType = isNonNullTypeNode(oldType) ? oldType.type : oldType;
        return safeChangeForFieldType(ofType, newType.type);
    }
    // old is non-null
    if (isNonNullTypeNode(oldType)) {
        return safeChangeForFieldType(newType, oldType, ignoreNullability);
    }
    // old is list
    if (isListTypeNode(oldType)) {
        return ((isListTypeNode(newType) && safeChangeForFieldType(oldType.type, newType.type)) ||
            (isNonNullTypeNode(newType) && safeChangeForFieldType(oldType, newType['type'])));
    }
    return false;
}

function mergeInputType(node, existingNode, config) {
    if (existingNode) {
        try {
            return {
                name: node.name,
                description: node['description'] || existingNode['description'],
                kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) ||
                    node.kind === 'InputObjectTypeDefinition' ||
                    existingNode.kind === 'InputObjectTypeDefinition'
                    ? 'InputObjectTypeDefinition'
                    : 'InputObjectTypeExtension',
                loc: node.loc,
                fields: mergeFields(node, node.fields, existingNode.fields, config),
                directives: mergeDirectives(node.directives, existingNode.directives, config),
            };
        }
        catch (e) {
            throw new Error(`Unable to merge GraphQL input type "${node.name.value}": ${e.message}`);
        }
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...node,
            kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        }
        : node;
}

function mergeInterface(node, existingNode, config) {
    if (existingNode) {
        try {
            return {
                name: node.name,
                description: node['description'] || existingNode['description'],
                kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) ||
                    node.kind === 'InterfaceTypeDefinition' ||
                    existingNode.kind === 'InterfaceTypeDefinition'
                    ? 'InterfaceTypeDefinition'
                    : 'InterfaceTypeExtension',
                loc: node.loc,
                fields: mergeFields(node, node.fields, existingNode.fields, config),
                directives: mergeDirectives(node.directives, existingNode.directives, config),
                interfaces: node['interfaces']
                    ? mergeNamedTypeArray(node['interfaces'], existingNode['interfaces'], config)
                    : undefined,
            };
        }
        catch (e) {
            throw new Error(`Unable to merge GraphQL interface "${node.name.value}": ${e.message}`);
        }
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...node,
            kind: Kind.INTERFACE_TYPE_DEFINITION,
        }
        : node;
}

function alreadyExists(arr, other) {
    return !!arr.find(i => i.name.value === other.name.value);
}
function mergeNamedTypeArray(first = [], second = [], config = {}) {
    const result = [...second, ...first.filter(d => !alreadyExists(second, d))];
    if (config && config.sort) {
        result.sort(compareNodes);
    }
    return result;
}

function mergeType(node, existingNode, config) {
    if (existingNode) {
        try {
            return {
                name: node.name,
                description: node['description'] || existingNode['description'],
                kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) ||
                    node.kind === 'ObjectTypeDefinition' ||
                    existingNode.kind === 'ObjectTypeDefinition'
                    ? 'ObjectTypeDefinition'
                    : 'ObjectTypeExtension',
                loc: node.loc,
                fields: mergeFields(node, node.fields, existingNode.fields, config),
                directives: mergeDirectives(node.directives, existingNode.directives, config),
                interfaces: mergeNamedTypeArray(node.interfaces, existingNode.interfaces, config),
            };
        }
        catch (e) {
            throw new Error(`Unable to merge GraphQL type "${node.name.value}": ${e.message}`);
        }
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...node,
            kind: Kind.OBJECT_TYPE_DEFINITION,
        }
        : node;
}

function mergeScalar(node, existingNode, config) {
    if (existingNode) {
        return {
            name: node.name,
            description: node['description'] || existingNode['description'],
            kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) ||
                node.kind === 'ScalarTypeDefinition' ||
                existingNode.kind === 'ScalarTypeDefinition'
                ? 'ScalarTypeDefinition'
                : 'ScalarTypeExtension',
            loc: node.loc,
            directives: mergeDirectives(node.directives, existingNode.directives, config),
        };
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...node,
            kind: Kind.SCALAR_TYPE_DEFINITION,
        }
        : node;
}

function mergeUnion(first, second, config) {
    if (second) {
        return {
            name: first.name,
            description: first['description'] || second['description'],
            // ConstXNode has been introduced in v16 but it is not compatible with XNode so we do `as any` for backwards compatibility
            directives: mergeDirectives(first.directives, second.directives, config),
            kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || first.kind === 'UnionTypeDefinition' || second.kind === 'UnionTypeDefinition'
                ? Kind.UNION_TYPE_DEFINITION
                : Kind.UNION_TYPE_EXTENSION,
            loc: first.loc,
            types: mergeNamedTypeArray(first.types, second.types, config),
        };
    }
    return (config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...first,
            kind: Kind.UNION_TYPE_DEFINITION,
        }
        : first;
}

const DEFAULT_OPERATION_TYPE_NAME_MAP = {
    query: 'Query',
    mutation: 'Mutation',
    subscription: 'Subscription',
};
function mergeOperationTypes(opNodeList = [], existingOpNodeList = []) {
    const finalOpNodeList = [];
    for (const opNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
        const opNode = opNodeList.find(n => n.operation === opNodeType) || existingOpNodeList.find(n => n.operation === opNodeType);
        if (opNode) {
            finalOpNodeList.push(opNode);
        }
    }
    return finalOpNodeList;
}
function mergeSchemaDefs(node, existingNode, config) {
    if (existingNode) {
        return {
            kind: node.kind === Kind.SCHEMA_DEFINITION || existingNode.kind === Kind.SCHEMA_DEFINITION
                ? Kind.SCHEMA_DEFINITION
                : Kind.SCHEMA_EXTENSION,
            description: node['description'] || existingNode['description'],
            directives: mergeDirectives(node.directives, existingNode.directives, config),
            operationTypes: mergeOperationTypes(node.operationTypes, existingNode.operationTypes),
        };
    }
    return ((config === null || config === void 0 ? void 0 : config.convertExtensions)
        ? {
            ...node,
            kind: Kind.SCHEMA_DEFINITION,
        }
        : node);
}

const schemaDefSymbol = 'SCHEMA_DEF_SYMBOL';
function isNamedDefinitionNode(definitionNode) {
    return 'name' in definitionNode;
}
function mergeGraphQLNodes(nodes, config) {
    var _a, _b, _c;
    const mergedResultMap = {};
    for (const nodeDefinition of nodes) {
        if (isNamedDefinitionNode(nodeDefinition)) {
            const name = (_a = nodeDefinition.name) === null || _a === void 0 ? void 0 : _a.value;
            if (config === null || config === void 0 ? void 0 : config.commentDescriptions) {
                collectComment(nodeDefinition);
            }
            if (name == null) {
                continue;
            }
            if (((_b = config === null || config === void 0 ? void 0 : config.exclusions) === null || _b === void 0 ? void 0 : _b.includes(name + '.*')) || ((_c = config === null || config === void 0 ? void 0 : config.exclusions) === null || _c === void 0 ? void 0 : _c.includes(name))) {
                delete mergedResultMap[name];
            }
            else {
                switch (nodeDefinition.kind) {
                    case Kind.OBJECT_TYPE_DEFINITION:
                    case Kind.OBJECT_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeType(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.ENUM_TYPE_DEFINITION:
                    case Kind.ENUM_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeEnum(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.UNION_TYPE_DEFINITION:
                    case Kind.UNION_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeUnion(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.SCALAR_TYPE_DEFINITION:
                    case Kind.SCALAR_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeScalar(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
                    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeInputType(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.INTERFACE_TYPE_DEFINITION:
                    case Kind.INTERFACE_TYPE_EXTENSION:
                        mergedResultMap[name] = mergeInterface(nodeDefinition, mergedResultMap[name], config);
                        break;
                    case Kind.DIRECTIVE_DEFINITION:
                        mergedResultMap[name] = mergeDirective(nodeDefinition, mergedResultMap[name]);
                        break;
                }
            }
        }
        else if (nodeDefinition.kind === Kind.SCHEMA_DEFINITION || nodeDefinition.kind === Kind.SCHEMA_EXTENSION) {
            mergedResultMap[schemaDefSymbol] = mergeSchemaDefs(nodeDefinition, mergedResultMap[schemaDefSymbol], config);
        }
    }
    return mergedResultMap;
}

function mergeTypeDefs(typeSource, config) {
    resetComments();
    const doc = {
        kind: Kind.DOCUMENT,
        definitions: mergeGraphQLTypes(typeSource, {
            useSchemaDefinition: true,
            forceSchemaDefinition: false,
            throwOnConflict: false,
            commentDescriptions: false,
            ...config,
        }),
    };
    let result;
    if (config === null || config === void 0 ? void 0 : config.commentDescriptions) {
        result = printWithComments(doc);
    }
    else {
        result = doc;
    }
    resetComments();
    return result;
}
function visitTypeSources(typeSource, options, allNodes = [], visitedTypeSources = new Set()) {
    if (typeSource && !visitedTypeSources.has(typeSource)) {
        visitedTypeSources.add(typeSource);
        if (typeof typeSource === 'function') {
            visitTypeSources(typeSource(), options, allNodes, visitedTypeSources);
        }
        else if (Array.isArray(typeSource)) {
            for (const type of typeSource) {
                visitTypeSources(type, options, allNodes, visitedTypeSources);
            }
        }
        else if (isSchema(typeSource)) {
            const documentNode = getDocumentNodeFromSchema(typeSource, options);
            visitTypeSources(documentNode.definitions, options, allNodes, visitedTypeSources);
        }
        else if (isStringTypes(typeSource) || isSourceTypes(typeSource)) {
            const documentNode = parse(typeSource, options);
            visitTypeSources(documentNode.definitions, options, allNodes, visitedTypeSources);
        }
        else if (typeof typeSource === 'object' && isDefinitionNode(typeSource)) {
            allNodes.push(typeSource);
        }
        else if (isDocumentNode(typeSource)) {
            visitTypeSources(typeSource.definitions, options, allNodes, visitedTypeSources);
        }
        else {
            throw new Error(`typeDefs must contain only strings, documents, schemas, or functions, got ${typeof typeSource}`);
        }
    }
    return allNodes;
}
function mergeGraphQLTypes(typeSource, config) {
    var _a, _b, _c;
    resetComments();
    const allNodes = visitTypeSources(typeSource, config);
    const mergedNodes = mergeGraphQLNodes(allNodes, config);
    if (config === null || config === void 0 ? void 0 : config.useSchemaDefinition) {
        // XXX: right now we don't handle multiple schema definitions
        const schemaDef = mergedNodes[schemaDefSymbol] || {
            kind: Kind.SCHEMA_DEFINITION,
            operationTypes: [],
        };
        const operationTypes = schemaDef.operationTypes;
        for (const opTypeDefNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
            const opTypeDefNode = operationTypes.find(operationType => operationType.operation === opTypeDefNodeType);
            if (!opTypeDefNode) {
                const possibleRootTypeName = DEFAULT_OPERATION_TYPE_NAME_MAP[opTypeDefNodeType];
                const existingPossibleRootType = mergedNodes[possibleRootTypeName];
                if (existingPossibleRootType != null && existingPossibleRootType.name != null) {
                    operationTypes.push({
                        kind: Kind.OPERATION_TYPE_DEFINITION,
                        type: {
                            kind: Kind.NAMED_TYPE,
                            name: existingPossibleRootType.name,
                        },
                        operation: opTypeDefNodeType,
                    });
                }
            }
        }
        if (((_a = schemaDef === null || schemaDef === void 0 ? void 0 : schemaDef.operationTypes) === null || _a === void 0 ? void 0 : _a.length) != null && schemaDef.operationTypes.length > 0) {
            mergedNodes[schemaDefSymbol] = schemaDef;
        }
    }
    if ((config === null || config === void 0 ? void 0 : config.forceSchemaDefinition) && !((_c = (_b = mergedNodes[schemaDefSymbol]) === null || _b === void 0 ? void 0 : _b.operationTypes) === null || _c === void 0 ? void 0 : _c.length)) {
        mergedNodes[schemaDefSymbol] = {
            kind: Kind.SCHEMA_DEFINITION,
            operationTypes: [
                {
                    kind: Kind.OPERATION_TYPE_DEFINITION,
                    operation: 'query',
                    type: {
                        kind: Kind.NAMED_TYPE,
                        name: {
                            kind: Kind.NAME,
                            value: 'Query',
                        },
                    },
                },
            ],
        };
    }
    const mergedNodeDefinitions = Object.values(mergedNodes);
    if (config === null || config === void 0 ? void 0 : config.sort) {
        const sortFn = typeof config.sort === 'function' ? config.sort : defaultStringComparator;
        mergedNodeDefinitions.sort((a, b) => { var _a, _b; return sortFn((_a = a.name) === null || _a === void 0 ? void 0 : _a.value, (_b = b.name) === null || _b === void 0 ? void 0 : _b.value); });
    }
    return mergedNodeDefinitions;
}

function mergeExtensions(extensions) {
    return mergeDeep(extensions);
}
function applyExtensionObject(obj, extensions) {
    if (!obj) {
        return;
    }
    obj.extensions = mergeDeep([obj.extensions || {}, extensions || {}]);
}
function applyExtensions(schema, extensions) {
    applyExtensionObject(schema, extensions.schemaExtensions);
    for (const [typeName, data] of Object.entries(extensions.types || {})) {
        const type = schema.getType(typeName);
        if (type) {
            applyExtensionObject(type, data.extensions);
            if (data.type === 'object' || data.type === 'interface') {
                for (const [fieldName, fieldData] of Object.entries(data.fields)) {
                    const field = type.getFields()[fieldName];
                    if (field) {
                        applyExtensionObject(field, fieldData.extensions);
                        for (const [arg, argData] of Object.entries(fieldData.arguments)) {
                            applyExtensionObject(field.args.find(a => a.name === arg), argData);
                        }
                    }
                }
            }
            else if (data.type === 'input') {
                for (const [fieldName, fieldData] of Object.entries(data.fields)) {
                    const field = type.getFields()[fieldName];
                    applyExtensionObject(field, fieldData.extensions);
                }
            }
            else if (data.type === 'enum') {
                for (const [valueName, valueData] of Object.entries(data.values)) {
                    const value = type.getValue(valueName);
                    applyExtensionObject(value, valueData);
                }
            }
        }
    }
    return schema;
}

/**
 * Builds a schema from the provided type definitions and resolvers.
 *
 * The type definitions are written using Schema Definition Language (SDL). They
 * can be provided as a string, a `DocumentNode`, a function, or an array of any
 * of these. If a function is provided, it will be passed no arguments and
 * should return an array of strings or `DocumentNode`s.
 *
 * Note: You can use GraphQL magic comment provide additional syntax
 * highlighting in your editor (with the appropriate editor plugin).
 *
 * ```js
 * const typeDefs = /* GraphQL *\/ `
 *   type Query {
 *     posts: [Post]
 *     author(id: Int!): Author
 *   }
 * `;
 * ```
 *
 * The `resolvers` object should be a map of type names to nested object, which
 * themselves map the type's fields to their appropriate resolvers.
 * See the [Resolvers](/docs/resolvers) section of the documentation for more details.
 *
 * ```js
 * const resolvers = {
 *   Query: {
 *     posts: (obj, args, ctx, info) => getAllPosts(),
 *     author: (obj, args, ctx, info) => getAuthorById(args.id)
 *   }
 * };
 * ```
 *
 * Once you've defined both the `typeDefs` and `resolvers`, you can create your
 * schema:
 *
 * ```js
 * const schema = makeExecutableSchema({
 *   typeDefs,
 *   resolvers,
 * })
 * ```
 */
function makeExecutableSchema({ typeDefs, resolvers = {}, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, schemaExtensions, ...otherOptions }) {
    // Validate and clean up arguments
    if (typeof resolverValidationOptions !== 'object') {
        throw new Error('Expected `resolverValidationOptions` to be an object');
    }
    if (!typeDefs) {
        throw new Error('Must provide typeDefs');
    }
    let schema;
    if (isSchema(typeDefs)) {
        schema = typeDefs;
    }
    else if (otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.commentDescriptions) {
        const mergedTypeDefs = mergeTypeDefs(typeDefs, {
            ...otherOptions,
            commentDescriptions: true,
        });
        schema = buildSchema(mergedTypeDefs, otherOptions);
    }
    else {
        const mergedTypeDefs = mergeTypeDefs(typeDefs, otherOptions);
        schema = buildASTSchema(mergedTypeDefs, otherOptions);
    }
    // We allow passing in an array of resolver maps, in which case we merge them
    schema = addResolversToSchema({
        schema,
        resolvers: mergeResolvers(resolvers),
        resolverValidationOptions,
        inheritResolversFromInterfaces,
        updateResolversInPlace,
    });
    if (Object.keys(resolverValidationOptions).length > 0) {
        assertResolversPresent(schema, resolverValidationOptions);
    }
    if (schemaExtensions) {
        schemaExtensions = mergeExtensions(asArray$1(schemaExtensions));
        applyExtensions(schema, schemaExtensions);
    }
    return schema;
}

var fetch$1 = globalThis.fetch; // To enable: import {fetch} from 'cross-fetch'
var Request$1 = globalThis.Request;
var Response$1 = globalThis.Response;
var ReadableStream = globalThis.ReadableStream;

async function processRequest({ request, params, enveloped, fetchAPI, onResultProcessHooks, }) {
    // Parse GraphQLParams
    const document = enveloped.parse(params.query);
    // Validate parsed Document Node
    enveloped.validate(enveloped.schema, document);
    // Build the context for the execution
    const contextValue = (await enveloped.contextFactory());
    const executionArgs = {
        schema: enveloped.schema,
        document,
        contextValue,
        variableValues: params.variables,
        operationName: params.operationName,
    };
    // Get the actual operation
    const operation = getOperationAST(document, params.operationName);
    // Choose the right executor
    const executeFn = (operation === null || operation === void 0 ? void 0 : operation.operation) === 'subscription'
        ? enveloped.subscribe
        : enveloped.execute;
    // Get the result to be processed
    const result = await executeFn(executionArgs);
    let resultProcessor;
    for (const onResultProcessHook of onResultProcessHooks) {
        await onResultProcessHook({
            request,
            result,
            resultProcessor,
            setResultProcessor(newResultProcessor) {
                resultProcessor = newResultProcessor;
            },
        });
    }
    // If no result processor found for this result, return an error
    if (!resultProcessor) {
        return new fetchAPI.Response(null, {
            status: 406,
            statusText: 'Not Acceptable',
        });
    }
    return resultProcessor(result, fetchAPI);
}

function getCORSHeadersByRequestAndOptions(request, corsOptions) {
    var _a, _b;
    const headers = {};
    if (corsOptions === false) {
        return headers;
    }
    // If defined origins have '*' or undefined by any means, we should allow all origins
    if (corsOptions.origin == null ||
        corsOptions.origin.length === 0 ||
        corsOptions.origin.includes('*')) {
        const currentOrigin = request.headers.get('origin');
        // If origin is available in the headers, use it
        if (currentOrigin != null) {
            headers['Access-Control-Allow-Origin'] = currentOrigin;
            // Vary by origin because there are multiple origins
            headers['Vary'] = 'Origin';
        }
        else {
            headers['Access-Control-Allow-Origin'] = '*';
        }
    }
    else if (typeof corsOptions.origin === 'string') {
        // If there is one specific origin is specified, use it directly
        headers['Access-Control-Allow-Origin'] = corsOptions.origin;
    }
    else if (Array.isArray(corsOptions.origin)) {
        // If there is only one origin defined in the array, consider it as a single one
        if (corsOptions.origin.length === 1) {
            headers['Access-Control-Allow-Origin'] = corsOptions.origin[0];
        }
        else {
            const currentOrigin = request.headers.get('origin');
            if (currentOrigin != null && corsOptions.origin.includes(currentOrigin)) {
                // If origin is available in the headers, use it
                headers['Access-Control-Allow-Origin'] = currentOrigin;
                // Vary by origin because there are multiple origins
                headers['Vary'] = 'Origin';
            }
            else {
                // There is no origin found in the headers, so we should return null
                headers['Access-Control-Allow-Origin'] = 'null';
            }
        }
    }
    if ((_a = corsOptions.methods) === null || _a === void 0 ? void 0 : _a.length) {
        headers['Access-Control-Allow-Methods'] = corsOptions.methods.join(', ');
    }
    else {
        const requestMethod = request.headers.get('access-control-request-method');
        if (requestMethod) {
            headers['Access-Control-Allow-Methods'] = requestMethod;
        }
    }
    if ((_b = corsOptions.allowedHeaders) === null || _b === void 0 ? void 0 : _b.length) {
        headers['Access-Control-Allow-Headers'] =
            corsOptions.allowedHeaders.join(', ');
    }
    else {
        const requestHeaders = request.headers.get('access-control-request-headers');
        if (requestHeaders) {
            headers['Access-Control-Allow-Headers'] = requestHeaders;
            if (headers['Vary']) {
                headers['Vary'] += ', Access-Control-Request-Headers';
            }
            headers['Vary'] = 'Access-Control-Request-Headers';
        }
    }
    if (corsOptions.credentials != null) {
        if (corsOptions.credentials === true) {
            headers['Access-Control-Allow-Credentials'] = 'true';
        }
    }
    else if (headers['Access-Control-Allow-Origin'] !== '*') {
        headers['Access-Control-Allow-Credentials'] = 'true';
    }
    if (corsOptions.exposedHeaders) {
        headers['Access-Control-Expose-Headers'] =
            corsOptions.exposedHeaders.join(', ');
    }
    if (corsOptions.maxAge) {
        headers['Access-Control-Max-Age'] = corsOptions.maxAge.toString();
    }
    return headers;
}
async function getCORSResponseHeaders(request, corsOptionsFactory, serverContext) {
    const corsOptions = await corsOptionsFactory(request, serverContext);
    return getCORSHeadersByRequestAndOptions(request, corsOptions);
}
function useCORS(options) {
    let corsOptionsFactory = () => ({});
    if (options != null) {
        if (typeof options === 'function') {
            corsOptionsFactory = options;
        }
        else if (typeof options === 'object') {
            const corsOptions = {
                ...options,
            };
            corsOptionsFactory = () => corsOptions;
        }
        else if (options === false) {
            corsOptionsFactory = () => false;
        }
    }
    return {
        async onRequest({ request, serverContext, fetchAPI, endResponse }) {
            if (request.method.toUpperCase() === 'OPTIONS') {
                const headers = await getCORSResponseHeaders(request, corsOptionsFactory, serverContext);
                const response = new fetchAPI.Response(null, {
                    status: 204,
                    headers: {
                        ...headers,
                        'Content-Length': '0',
                    },
                });
                endResponse(response);
            }
        },
        async onResponse({ request, serverContext, response }) {
            const headers = await getCORSResponseHeaders(request, corsOptionsFactory, serverContext);
            for (const headerName in headers) {
                response.headers.set(headerName, headers[headerName]);
            }
        },
    };
}

function useHealthCheck(options) {
    const id = (options === null || options === void 0 ? void 0 : options.id) || Date.now().toString();
    const logger = (options === null || options === void 0 ? void 0 : options.logger) || console;
    return {
        async onRequest({ request, endResponse, fetchAPI }) {
            const requestPath = request.url.split('?')[0];
            if (requestPath.endsWith('/health')) {
                logger.debug(`Responding Health Check`);
                const response = new fetchAPI.Response(JSON.stringify({
                    message: 'alive',
                }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-yoga-id': id,
                    },
                });
                endResponse(response);
            }
            else if (requestPath.endsWith('/readiness')) {
                logger.debug(`Responding Readiness Check`);
                const readinessResponse = await fetchAPI.fetch(request.url.replace('/readiness', '/health'));
                const { message } = await readinessResponse.json();
                if (readinessResponse.status === 200 &&
                    readinessResponse.headers.get('x-yoga-id') === id &&
                    message === 'alive') {
                    const response = new fetchAPI.Response(JSON.stringify({
                        message: 'ready',
                    }), {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    endResponse(response);
                }
                else {
                    throw createGraphQLError(`Readiness check failed with status ${readinessResponse.status}`);
                }
            }
        },
    };
}

var graphiqlHTML = "<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>__TITLE__</title><link rel=icon href=https://www.graphql-yoga.com/favicon.ico><link rel=stylesheet href=https://unpkg.com/@graphql-yoga/graphiql@2.4.3/dist/style.css></head><body id=body class=no-focus-outline><noscript>You need to enable JavaScript to run this app.</noscript><div id=root></div><script type=module>import{renderYogaGraphiQL}from\"https://unpkg.com/@graphql-yoga/graphiql@2.4.3/dist/yoga-graphiql.es.js\";renderYogaGraphiQL(root,__OPTS__)</script></body></html>";

function shouldRenderGraphiQL({ headers, method }) {
    var _a;
    return method === 'GET' && !!((_a = headers === null || headers === void 0 ? void 0 : headers.get('accept')) === null || _a === void 0 ? void 0 : _a.includes('text/html'));
}
const renderGraphiQL = (opts) => graphiqlHTML
    .replace('__TITLE__', (opts === null || opts === void 0 ? void 0 : opts.title) || 'Yoga GraphiQL')
    .replace('__OPTS__', JSON.stringify(opts !== null && opts !== void 0 ? opts : {}));
function useGraphiQL(config) {
    var _a, _b;
    const logger = (_a = config === null || config === void 0 ? void 0 : config.logger) !== null && _a !== void 0 ? _a : console;
    let graphiqlOptionsFactory;
    if (typeof (config === null || config === void 0 ? void 0 : config.options) === 'function') {
        graphiqlOptionsFactory = config === null || config === void 0 ? void 0 : config.options;
    }
    else if (typeof (config === null || config === void 0 ? void 0 : config.options) === 'object') {
        graphiqlOptionsFactory = () => config === null || config === void 0 ? void 0 : config.options;
    }
    else if ((config === null || config === void 0 ? void 0 : config.options) === false) {
        graphiqlOptionsFactory = () => false;
    }
    else {
        graphiqlOptionsFactory = () => ({});
    }
    const renderer = (_b = config === null || config === void 0 ? void 0 : config.render) !== null && _b !== void 0 ? _b : renderGraphiQL;
    return {
        async onRequest({ request, serverContext, fetchAPI, endResponse }) {
            const requestPath = request.url.split('?')[0];
            if ((config === null || config === void 0 ? void 0 : config.endpoint) != null && !requestPath.endsWith(config === null || config === void 0 ? void 0 : config.endpoint)) {
                logger.debug(`Responding 404 Not Found`);
                const response = new fetchAPI.Response(`Unable to ${request.method} ${requestPath}`, {
                    status: 404,
                    statusText: `Not Found`,
                });
                endResponse(response);
            }
            else if (shouldRenderGraphiQL(request)) {
                logger.debug(`Rendering GraphiQL`);
                const graphiqlOptions = graphiqlOptionsFactory(request, serverContext);
                if (graphiqlOptions) {
                    const graphiQLBody = await renderer({
                        endpoint: config === null || config === void 0 ? void 0 : config.endpoint,
                        ...(graphiqlOptions === true ? {} : graphiqlOptions),
                    });
                    const response = new fetchAPI.Response(graphiQLBody, {
                        headers: {
                            'Content-Type': 'text/html',
                        },
                        status: 200,
                    });
                    endResponse(response);
                }
            }
        },
    };
}

const DEFAULT_MATCHER = () => true;
function useRequestParser(options) {
    const matchFn = options.match || DEFAULT_MATCHER;
    return {
        onRequestParse({ request, setRequestParser }) {
            if (matchFn(request)) {
                setRequestParser(function useRequestParserFn(request) {
                    return options.parse(request);
                });
            }
        },
    };
}

function parseURLSearchParams(requestBody) {
    const searchParams = new URLSearchParams(requestBody);
    const operationName = searchParams.get('operationName') || undefined;
    const query = searchParams.get('query') || undefined;
    const variablesStr = searchParams.get('variables') || undefined;
    const extensionsStr = searchParams.get('extensions') || undefined;
    return {
        operationName,
        query,
        variables: variablesStr ? JSON.parse(variablesStr) : undefined,
        extensions: extensionsStr ? JSON.parse(extensionsStr) : undefined,
    };
}
function isContentTypeMatch(request, expectedContentType) {
    const contentType = request.headers.get('content-type');
    return (contentType === expectedContentType ||
        !!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith(`${expectedContentType};`)));
}

function isGETRequest(request) {
    return request.method === 'GET';
}
function parseGETRequest(request) {
    const [, searchParamsStr] = request.url.split('?');
    return parseURLSearchParams(searchParamsStr);
}

function isPOSTJsonRequest(request) {
    return request.method === 'POST';
}
async function parsePOSTJsonRequest(request) {
    const requestBody = await request.json();
    return {
        operationName: requestBody.operationName,
        query: requestBody.query,
        variables: requestBody.variables,
        extensions: requestBody.extensions,
    };
}

function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}

function isPOSTMultipartRequest(request) {
    return (request.method === 'POST' &&
        isContentTypeMatch(request, 'multipart/form-data'));
}
async function parsePOSTMultipartRequest(request) {
    var _a, _b;
    let requestBody;
    try {
        requestBody = await request.formData();
    }
    catch (e) {
        // Trick for @whatwg-node/fetch errors on Node.js
        // TODO: This needs a better solution
        if (e instanceof Error &&
            e.message.startsWith('File size limit exceeded: ')) {
            throw createGraphQLError(e.message, {
                extensions: {
                    http: {
                        status: 413,
                    },
                },
            });
        }
        throw e;
    }
    const operationsStr = ((_a = requestBody.get('operations')) === null || _a === void 0 ? void 0 : _a.toString()) || '{}';
    const operations = JSON.parse(operationsStr);
    const mapStr = ((_b = requestBody.get('map')) === null || _b === void 0 ? void 0 : _b.toString()) || '{}';
    const map = JSON.parse(mapStr);
    for (const fileIndex in map) {
        const file = requestBody.get(fileIndex);
        const keys = map[fileIndex];
        for (const key of keys) {
            dset(operations, key, file);
        }
    }
    return {
        operationName: operations.operationName,
        query: operations.query,
        variables: operations.variables,
        extensions: operations.extensions,
    };
}

function isPOSTGraphQLStringRequest(request) {
    return (request.method === 'POST' &&
        isContentTypeMatch(request, 'application/graphql'));
}
async function parsePOSTGraphQLStringRequest(request) {
    const requestBody = await request.text();
    return {
        query: requestBody,
    };
}

function useResultProcessor(options) {
    const isMatch = options.match || (() => true);
    return {
        onResultProcess({ request, result, setResultProcessor }) {
            if (isMatch(request, result)) {
                setResultProcessor(options.processResult);
            }
        },
    };
}

let encodeString;
if (globalThis.Buffer) {
    encodeString = function encodeStringWithBuffer(str) {
        return globalThis.Buffer.from(str, 'utf8');
    };
}
else {
    const textEncoder = new TextEncoder();
    encodeString = function encodeStringWithTextEncoder(str) {
        return textEncoder.encode(str);
    };
}

function isRegularResult(request, result) {
    return !isAsyncIterable(result);
}
function processRegularResult(executionResult, fetchAPI) {
    const responseBody = JSON.stringify(executionResult);
    const decodedString = encodeString(responseBody);
    const headersInit = {
        'Content-Type': 'application/json',
        'Content-Length': decodedString.byteLength.toString(),
    };
    const responseInit = {
        headers: headersInit,
        status: 200,
    };
    return new fetchAPI.Response(decodedString, responseInit);
}

function isPushResult(request, result) {
    var _a;
    return (isAsyncIterable$1(result) &&
        !!((_a = request.headers.get('accept')) === null || _a === void 0 ? void 0 : _a.includes('text/event-stream')));
}
function processPushResult(result, fetchAPI) {
    const headersInit = {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        'Content-Encoding': 'none',
    };
    const responseInit = {
        headers: headersInit,
        status: 200,
    };
    let iterator;
    const readableStream = new fetchAPI.ReadableStream({
        start() {
            iterator = result[Symbol.asyncIterator]();
        },
        async pull(controller) {
            const { done, value } = await iterator.next();
            if (value != null) {
                const chunk = JSON.stringify(value);
                controller.enqueue(encodeString(`data: ${chunk}\n\n`));
            }
            if (done) {
                controller.close();
            }
        },
        async cancel(e) {
            var _a;
            await ((_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator, e));
        },
    });
    return new fetchAPI.Response(readableStream, responseInit);
}

function isMultipartResult(request, result) {
    var _a;
    return (isAsyncIterable$1(result) &&
        !!((_a = request.headers.get('accept')) === null || _a === void 0 ? void 0 : _a.includes('multipart/mixed')));
}
function processMultipartResult(executionPatchResultIterable, fetchAPI) {
    const headersInit = {
        Connection: 'keep-alive',
        'Content-Type': 'multipart/mixed; boundary="-"',
        'Transfer-Encoding': 'chunked',
    };
    const responseInit = {
        headers: headersInit,
        status: 200,
    };
    let iterator;
    const readableStream = new fetchAPI.ReadableStream({
        start(controller) {
            iterator = executionPatchResultIterable[Symbol.asyncIterator]();
            controller.enqueue(encodeString(`---`));
        },
        async pull(controller) {
            const { done, value } = await iterator.next();
            if (value != null) {
                controller.enqueue(encodeString('\r\n'));
                controller.enqueue(encodeString('Content-Type: application/json; charset=utf-8'));
                controller.enqueue(encodeString('\r\n'));
                const chunk = JSON.stringify(value);
                const encodedChunk = encodeString(chunk);
                controller.enqueue(encodeString('Content-Length: ' + encodedChunk.byteLength));
                controller.enqueue(encodeString('\r\n'));
                controller.enqueue(encodeString('\r\n'));
                controller.enqueue(encodedChunk);
                controller.enqueue(encodeString('\r\n'));
                controller.enqueue(encodeString('---'));
            }
            if (done) {
                controller.enqueue(encodeString('\r\n-----\r\n'));
                controller.close();
            }
        },
        async cancel(e) {
            var _a;
            await ((_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator, e));
        },
    });
    return new fetchAPI.Response(readableStream, responseInit);
}

function isPOSTFormUrlEncodedRequest(request) {
    return (request.method === 'POST' &&
        isContentTypeMatch(request, 'application/x-www-form-urlencoded'));
}
async function parsePOSTFormUrlEncodedRequest(request) {
    const requestBody = await request.text();
    return parseURLSearchParams(requestBody);
}

function isAggregateError(obj) {
    return obj != null && typeof obj === 'object' && 'errors' in obj;
}
function hasToString(obj) {
    return obj != null && typeof obj.toString === 'function';
}
function handleError(error, errors = []) {
    if (isAggregateError(error)) {
        for (const singleError of error.errors) {
            errors.push(...handleError(singleError));
        }
    }
    else if (error instanceof GraphQLError) {
        errors.push(error);
    }
    else if (error instanceof Error) {
        errors.push(createGraphQLError(error.message));
    }
    else if (typeof error === 'string') {
        errors.push(createGraphQLError(error));
    }
    else if (hasToString(error)) {
        errors.push(createGraphQLError(error.toString()));
    }
    else {
        errors.push(createGraphQLError('Unexpected error!'));
    }
    return errors;
}

function useCheckMethodForGraphQL() {
    return {
        onRequest({ request }) {
            if (request.method !== 'GET' && request.method !== 'POST') {
                throw createGraphQLError('GraphQL only supports GET and POST requests.', {
                    extensions: {
                        http: {
                            status: 405,
                            headers: {
                                Allow: 'GET, POST',
                            },
                        },
                    },
                });
            }
        },
    };
}

function useCheckGraphQLQueryParam() {
    return {
        onRequestParse() {
            return {
                onRequestParseDone({ params }) {
                    if (params.query == null) {
                        throw createGraphQLError('Must provide query string.', {
                            extensions: {
                                http: {
                                    status: 400,
                                    headers: {
                                        Allow: 'GET, POST',
                                    },
                                },
                            },
                        });
                    }
                    const queryParamType = typeof params.query;
                    if (queryParamType !== 'string') {
                        throw createGraphQLError(`Expected "query" to be "string" but given "${queryParamType}".`, {
                            extensions: {
                                http: {
                                    status: 400,
                                    headers: {
                                        Allow: 'GET, POST',
                                    },
                                },
                            },
                        });
                    }
                },
            };
        },
    };
}

function useHTTPValidationError() {
    return {
        onValidate() {
            return ({ valid, result }) => {
                if (!valid) {
                    result.forEach((error) => {
                        error.extensions.http = {
                            status: 400,
                        };
                    });
                    throw new AggregateErrorImpl(result);
                }
            };
        },
    };
}

function usePreventMutationViaGET() {
    return {
        onParse() {
            // We should improve this by getting Yoga stuff from the hook params directly instead of the context
            return ({ result, context: { request, operationName } }) => {
                var _a;
                if (result instanceof Error) {
                    if (result instanceof GraphQLError) {
                        result.extensions.http = {
                            status: 400,
                        };
                    }
                    throw result;
                }
                const operation = result
                    ? (_a = getOperationAST(result, operationName)) !== null && _a !== void 0 ? _a : undefined
                    : undefined;
                if (!operation) {
                    throw createGraphQLError('Could not determine what operation to execute.', {
                        extensions: {
                            http: {
                                status: 400,
                            },
                        },
                    });
                }
                if (operation.operation === 'mutation' && request.method === 'GET') {
                    throw createGraphQLError('Can only perform a mutation operation from a POST request.', {
                        extensions: {
                            http: {
                                status: 405,
                                headers: {
                                    Allow: 'POST',
                                },
                            },
                        },
                    });
                }
            };
        },
    };
}

function getDefaultSchema() {
    return makeExecutableSchema({
        typeDefs: /* GraphQL */ `
      """
      Greetings from GraphQL Yoga!
      """
      type Query {
        greetings: String
      }
      type Subscription {
        """
        Current Time
        """
        time: String
      }
    `,
        resolvers: {
            Query: {
                greetings: () => 'This is the `greetings` field of the root `Query` type',
            },
            Subscription: {
                time: {
                    async *subscribe() {
                        while (true) {
                            yield { time: new Date().toISOString() };
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                        }
                    },
                },
            },
        },
    });
}
/**
 * Base class that can be extended to create a GraphQL server with any HTTP server framework.
 * @internal
 */
class YogaServer {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.handleRequest = async (request, ...args) => {
            const response = await this.getResponse(request, ...args);
            for (const onResponseHook of this.onResponseHooks) {
                await onResponseHook({
                    request,
                    response,
                    serverContext: args[0],
                });
            }
            return response;
        };
        this.fetch = (input, init) => {
            let request;
            if (typeof input === 'string') {
                request = new this.fetchAPI.Request(input, init);
            }
            else {
                request = input;
            }
            return this.handleRequest(request, init);
        };
        // FetchEvent is not available in all envs
        this.fetchEventListener = (event) => event.respondWith(this.handleRequest(event.request, event));
        this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : 'yoga';
        this.fetchAPI = {
            Request: (_c = (_b = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _b === void 0 ? void 0 : _b.Request) !== null && _c !== void 0 ? _c : Request$1,
            Response: (_e = (_d = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _d === void 0 ? void 0 : _d.Response) !== null && _e !== void 0 ? _e : Response$1,
            fetch: (_g = (_f = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _f === void 0 ? void 0 : _f.fetch) !== null && _g !== void 0 ? _g : fetch$1,
            ReadableStream: (_j = (_h = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _h === void 0 ? void 0 : _h.ReadableStream) !== null && _j !== void 0 ? _j : ReadableStream,
        };
        const schema = (options === null || options === void 0 ? void 0 : options.schema)
            ? isSchema(options.schema)
                ? options.schema
                : makeExecutableSchema({
                    typeDefs: options.schema.typeDefs,
                    resolvers: options.schema.resolvers,
                })
            : getDefaultSchema();
        const logger = (options === null || options === void 0 ? void 0 : options.logging) != null ? options.logging : true;
        this.logger =
            typeof logger === 'boolean'
                ? logger === true
                    ? defaultYogaLogger
                    : {
                        debug: () => { },
                        error: () => { },
                        warn: () => { },
                        info: () => { },
                    }
                : logger;
        const maskedErrors = (_k = options === null || options === void 0 ? void 0 : options.maskedErrors) !== null && _k !== void 0 ? _k : true;
        const server = this;
        this.endpoint = options === null || options === void 0 ? void 0 : options.endpoint;
        this.plugins = [
            // Use the schema provided by the user
            enableIf(schema != null, useSchema(schema)),
            // Performance things
            enableIf((options === null || options === void 0 ? void 0 : options.parserCache) !== false, () => useParserCache(typeof (options === null || options === void 0 ? void 0 : options.parserCache) === 'object'
                ? options === null || options === void 0 ? void 0 : options.parserCache
                : undefined)),
            enableIf((options === null || options === void 0 ? void 0 : options.validationCache) !== false, () => useValidationCache({
                cache: typeof (options === null || options === void 0 ? void 0 : options.validationCache) === 'object'
                    ? options === null || options === void 0 ? void 0 : options.validationCache
                    : undefined,
            })),
            // Log events - useful for debugging purposes
            enableIf(logger !== false, useLogger({
                skipIntrospection: true,
                logFn: (eventName, events) => {
                    switch (eventName) {
                        case 'execute-start':
                        case 'subscribe-start':
                            this.logger.debug(titleBold('Execution start'));
                            const { query, operationName, variables, extensions, } = events.args.contextValue;
                            this.logger.debug(titleBold('Received GraphQL operation:'));
                            this.logger.debug({
                                query,
                                operationName,
                                variables,
                                extensions,
                            });
                            break;
                        case 'execute-end':
                        case 'subscribe-end':
                            this.logger.debug(titleBold('Execution end'));
                            this.logger.debug({
                                result: events.result,
                            });
                            break;
                    }
                },
            })),
            enableIf((options === null || options === void 0 ? void 0 : options.context) != null, useExtendContext(async (initialContext) => {
                if (options === null || options === void 0 ? void 0 : options.context) {
                    if (typeof options.context === 'function') {
                        return options.context(initialContext);
                    }
                    return options.context;
                }
            })),
            // Middlewares before processing the incoming HTTP request
            useHealthCheck({
                id: this.id,
                logger: this.logger,
            }),
            enableIf((options === null || options === void 0 ? void 0 : options.graphiql) !== false, () => useGraphiQL({
                get endpoint() {
                    return server.endpoint;
                },
                options: options === null || options === void 0 ? void 0 : options.graphiql,
                render: options === null || options === void 0 ? void 0 : options.renderGraphiQL,
                logger: this.logger,
            })),
            enableIf((options === null || options === void 0 ? void 0 : options.cors) !== false, () => useCORS(options === null || options === void 0 ? void 0 : options.cors)),
            // Middlewares before the GraphQL execution
            useCheckMethodForGraphQL(),
            useRequestParser({
                match: isGETRequest,
                parse: parseGETRequest,
            }),
            useRequestParser({
                match: isPOSTJsonRequest,
                parse: parsePOSTJsonRequest,
            }),
            enableIf((options === null || options === void 0 ? void 0 : options.multipart) !== false, () => useRequestParser({
                match: isPOSTMultipartRequest,
                parse: parsePOSTMultipartRequest,
            })),
            useRequestParser({
                match: isPOSTGraphQLStringRequest,
                parse: parsePOSTGraphQLStringRequest,
            }),
            useRequestParser({
                match: isPOSTFormUrlEncodedRequest,
                parse: parsePOSTFormUrlEncodedRequest,
            }),
            // Middlewares after the GraphQL execution
            useResultProcessor({
                match: isRegularResult,
                processResult: processRegularResult,
            }),
            useResultProcessor({
                match: isPushResult,
                processResult: processPushResult,
            }),
            useResultProcessor({
                match: isMultipartResult,
                processResult: processMultipartResult,
            }),
            ...((_l = options === null || options === void 0 ? void 0 : options.plugins) !== null && _l !== void 0 ? _l : []),
            useCheckGraphQLQueryParam(),
            // To make sure those are called at the end
            {
                onPluginInit({ addPlugin }) {
                    addPlugin(
                    // We make sure that the user doesn't send a mutation with GET
                    usePreventMutationViaGET());
                    if (!!maskedErrors) {
                        addPlugin(useMaskedErrors(typeof maskedErrors === 'object' ? maskedErrors : undefined));
                    }
                    addPlugin(
                    // We handle validation errors at the end
                    useHTTPValidationError());
                },
            },
        ];
        this.getEnveloped = envelop({
            plugins: this.plugins,
        });
        this.onRequestHooks = [];
        this.onRequestParseHooks = [];
        this.onResultProcessHooks = [];
        this.onResponseHooks = [];
        for (const plugin of this.plugins) {
            if (plugin) {
                if (plugin.onRequestParse) {
                    this.onRequestParseHooks.push(plugin.onRequestParse);
                }
                if (plugin.onRequest) {
                    this.onRequestHooks.push(plugin.onRequest);
                }
                if (plugin.onResultProcess) {
                    this.onResultProcessHooks.push(plugin.onResultProcess);
                }
                if (plugin.onResponse) {
                    this.onResponseHooks.push(plugin.onResponse);
                }
            }
        }
    }
    async getResponse(request, ...args) {
        var _a, _b;
        const serverContext = args[0];
        try {
            for (const onRequestHook of this.onRequestHooks) {
                let response;
                await onRequestHook({
                    request,
                    serverContext,
                    fetchAPI: this.fetchAPI,
                    endResponse(newResponse) {
                        response = newResponse;
                    },
                });
                if (response) {
                    return response;
                }
            }
            let requestParser;
            const onRequestParseDoneList = [];
            for (const onRequestParse of this.onRequestParseHooks) {
                const onRequestParseResult = await onRequestParse({
                    request,
                    requestParser,
                    setRequestParser(parser) {
                        requestParser = parser;
                    },
                });
                if ((onRequestParseResult === null || onRequestParseResult === void 0 ? void 0 : onRequestParseResult.onRequestParseDone) != null) {
                    onRequestParseDoneList.push(onRequestParseResult.onRequestParseDone);
                }
            }
            this.logger.debug(`Parsing request to extract GraphQL parameters`);
            if (!requestParser) {
                return new this.fetchAPI.Response('Request is not valid', {
                    status: 400,
                    statusText: 'Bad Request',
                });
            }
            let params = await requestParser(request);
            for (const onRequestParseDone of onRequestParseDoneList) {
                await onRequestParseDone({
                    params,
                    setParams(newParams) {
                        params = newParams;
                    },
                });
            }
            const initialContext = {
                request,
                ...params,
                ...serverContext,
            };
            const enveloped = this.getEnveloped(initialContext);
            this.logger.debug(`Processing GraphQL Parameters`);
            const result = await processRequest({
                request,
                params,
                enveloped,
                fetchAPI: this.fetchAPI,
                onResultProcessHooks: this.onResultProcessHooks,
            });
            return result;
        }
        catch (error) {
            const finalResponseInit = {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const errors = handleError(error);
            for (const error of errors) {
                if ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.http) {
                    if (error.extensions.http.status &&
                        ((_b = error.extensions) === null || _b === void 0 ? void 0 : _b.http.status) > finalResponseInit.status) {
                        finalResponseInit.status = error.extensions.http.status;
                    }
                    if (error.extensions.http.headers) {
                        Object.assign(finalResponseInit.headers, error.extensions.http.headers);
                    }
                    // Remove http extensions from the final response
                    error.extensions.http = undefined;
                }
            }
            const payload = {
                data: null,
                errors,
            };
            const decodedString = encodeString(JSON.stringify(payload));
            finalResponseInit.headers['Content-Length'] =
                decodedString.byteLength.toString();
            return new this.fetchAPI.Response(decodedString, finalResponseInit);
        }
    }
    /**
     * Testing utility to mock http request for GraphQL endpoint
     *
     *
     * Example - Test a simple query
     * ```ts
     * const { response, executionResult } = await yoga.inject({
     *  document: "query { ping }",
     * })
     * expect(response.status).toBe(200)
     * expect(executionResult.data.ping).toBe('pong')
     * ```
     **/
    async inject({ document, variables, operationName, headers, serverContext, }) {
        const request = new this.fetchAPI.Request('http://localhost/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify({
                query: document &&
                    (typeof document === 'string' ? document : print(document)),
                variables,
                operationName,
            }),
        });
        const response = await this.handleRequest(request, serverContext);
        let executionResult = null;
        if (response.headers.get('content-type') === 'application/json') {
            executionResult = await response.json();
        }
        return {
            response,
            executionResult,
        };
    }
    start() {
        self.addEventListener('fetch', this.fetchEventListener);
    }
    stop() {
        self.removeEventListener('fetch', this.fetchEventListener);
    }
}
function createServer(options) {
    const server = new YogaServer(options);
    // TODO: Will be removed once we get rid of classes
    const fnHandler = (input, ctx) => {
        // Is input a container object over Request?
        if (input.request) {
            // In this input is also the context
            return server.handleRequest(input.request, input);
        }
        // Or is it Request itself?
        // Then ctx is present and it is the context
        return server.handleRequest(input, ctx);
    };
    return new Proxy(server, {
        // It should have all the attributes of the handler function and the server instance
        has: (_, prop) => {
            return prop in fnHandler || prop in server;
        },
        get: (_, prop) => {
            if (server[prop]) {
                if (server[prop].bind) {
                    return server[prop].bind(server);
                }
                return server[prop];
            }
            if (fnHandler[prop]) {
                if (fnHandler[prop].bind) {
                    return fnHandler[prop].bind(fnHandler);
                }
                return fnHandler[prop];
            }
        },
        apply(_, __, [input, ctx]) {
            return fnHandler(input, ctx);
        },
    });
}

/// <reference types="./repeater.d.ts" />
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

/** An error subclass which is thrown when there are too many pending push or next operations on a single repeater. */
var RepeaterOverflowError = /** @class */ (function (_super) {
    __extends(RepeaterOverflowError, _super);
    function RepeaterOverflowError(message) {
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, "name", {
            value: "RepeaterOverflowError",
            enumerable: false,
        });
        if (typeof Object.setPrototypeOf === "function") {
            Object.setPrototypeOf(_this, _this.constructor.prototype);
        }
        else {
            _this.__proto__ = _this.constructor.prototype;
        }
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    return RepeaterOverflowError;
}(Error));
/** A buffer which allows you to push a set amount of values to the repeater without pushes waiting or throwing errors. */
/** @class */ ((function () {
    function FixedBuffer(capacity) {
        if (capacity < 0) {
            throw new RangeError("Capacity may not be less than 0");
        }
        this._c = capacity;
        this._q = [];
    }
    Object.defineProperty(FixedBuffer.prototype, "empty", {
        get: function () {
            return this._q.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FixedBuffer.prototype, "full", {
        get: function () {
            return this._q.length >= this._c;
        },
        enumerable: false,
        configurable: true
    });
    FixedBuffer.prototype.add = function (value) {
        if (this.full) {
            throw new Error("Buffer full");
        }
        else {
            this._q.push(value);
        }
    };
    FixedBuffer.prototype.remove = function () {
        if (this.empty) {
            throw new Error("Buffer empty");
        }
        return this._q.shift();
    };
    return FixedBuffer;
})());
// TODO: Use a circular buffer here.
/** Sliding buffers allow you to push a set amount of values to the repeater without pushes waiting or throwing errors. If the number of values exceeds the capacity set in the constructor, the buffer will discard the earliest values added. */
/** @class */ ((function () {
    function SlidingBuffer(capacity) {
        if (capacity < 1) {
            throw new RangeError("Capacity may not be less than 1");
        }
        this._c = capacity;
        this._q = [];
    }
    Object.defineProperty(SlidingBuffer.prototype, "empty", {
        get: function () {
            return this._q.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingBuffer.prototype, "full", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    SlidingBuffer.prototype.add = function (value) {
        while (this._q.length >= this._c) {
            this._q.shift();
        }
        this._q.push(value);
    };
    SlidingBuffer.prototype.remove = function () {
        if (this.empty) {
            throw new Error("Buffer empty");
        }
        return this._q.shift();
    };
    return SlidingBuffer;
})());
/** Dropping buffers allow you to push a set amount of values to the repeater without the push function waiting or throwing errors. If the number of values exceeds the capacity set in the constructor, the buffer will discard the latest values added. */
/** @class */ ((function () {
    function DroppingBuffer(capacity) {
        if (capacity < 1) {
            throw new RangeError("Capacity may not be less than 1");
        }
        this._c = capacity;
        this._q = [];
    }
    Object.defineProperty(DroppingBuffer.prototype, "empty", {
        get: function () {
            return this._q.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DroppingBuffer.prototype, "full", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DroppingBuffer.prototype.add = function (value) {
        if (this._q.length < this._c) {
            this._q.push(value);
        }
    };
    DroppingBuffer.prototype.remove = function () {
        if (this.empty) {
            throw new Error("Buffer empty");
        }
        return this._q.shift();
    };
    return DroppingBuffer;
})());
/** Makes sure promise-likes don’t cause unhandled rejections. */
function swallow(value) {
    if (value != null && typeof value.then === "function") {
        value.then(NOOP, NOOP);
    }
}
/*** REPEATER STATES ***/
/** The following is an enumeration of all possible repeater states. These states are ordered, and a repeater may only advance to higher states. */
/** The initial state of the repeater. */
var Initial = 0;
/** Repeaters advance to this state the first time the next method is called on the repeater. */
var Started = 1;
/** Repeaters advance to this state when the stop function is called. */
var Stopped = 2;
/** Repeaters advance to this state when there are no values left to be pulled from the repeater. */
var Done = 3;
/** Repeaters advance to this state if an error is thrown into the repeater. */
var Rejected = 4;
/** The maximum number of push or next operations which may exist on a single repeater. */
var MAX_QUEUE_LENGTH = 1024;
var NOOP = function () { };
/** A helper function used to mimic the behavior of async generators where the final iteration is consumed. */
function consumeExecution(r) {
    var err = r.err;
    var execution = Promise.resolve(r.execution).then(function (value) {
        if (err != null) {
            throw err;
        }
        return value;
    });
    r.err = undefined;
    r.execution = execution.then(function () { return undefined; }, function () { return undefined; });
    return r.pending === undefined ? execution : r.pending.then(function () { return execution; });
}
/** A helper function for building iterations from values. Promises are unwrapped, so that iterations never have their value property set to a promise. */
function createIteration(r, value) {
    var done = r.state >= Done;
    return Promise.resolve(value).then(function (value) {
        if (!done && r.state >= Rejected) {
            return consumeExecution(r).then(function (value) { return ({
                value: value,
                done: true,
            }); });
        }
        return { value: value, done: done };
    });
}
/**
 * This function is bound and passed to the executor as the stop argument.
 *
 * Advances state to Stopped.
 */
function stop(r, err) {
    var e_1, _a;
    if (r.state >= Stopped) {
        return;
    }
    r.state = Stopped;
    r.onnext();
    r.onstop();
    if (r.err == null) {
        r.err = err;
    }
    if (r.pushes.length === 0 &&
        (typeof r.buffer === "undefined" || r.buffer.empty)) {
        finish(r);
    }
    else {
        try {
            for (var _b = __values(r.pushes), _d = _b.next(); !_d.done; _d = _b.next()) {
                var push_1 = _d.value;
                push_1.resolve();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
}
/**
 * The difference between stopping a repeater vs finishing a repeater is that stopping a repeater allows next to continue to drain values from the push queue and buffer, while finishing a repeater will clear all pending values and end iteration immediately. Once, a repeater is finished, all iterations will have the done property set to true.
 *
 * Advances state to Done.
 */
function finish(r) {
    var e_2, _a;
    if (r.state >= Done) {
        return;
    }
    if (r.state < Stopped) {
        stop(r);
    }
    r.state = Done;
    r.buffer = undefined;
    try {
        for (var _b = __values(r.nexts), _d = _b.next(); !_d.done; _d = _b.next()) {
            var next = _d.value;
            var execution = r.pending === undefined
                ? consumeExecution(r)
                : r.pending.then(function () { return consumeExecution(r); });
            next.resolve(createIteration(r, execution));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    r.pushes = [];
    r.nexts = [];
}
/**
 * Called when a promise passed to push rejects, or when a push call is unhandled.
 *
 * Advances state to Rejected.
 */
function reject(r) {
    if (r.state >= Rejected) {
        return;
    }
    if (r.state < Done) {
        finish(r);
    }
    r.state = Rejected;
}
/** This function is bound and passed to the executor as the push argument. */
function push(r, value) {
    swallow(value);
    if (r.pushes.length >= MAX_QUEUE_LENGTH) {
        throw new RepeaterOverflowError("No more than " + MAX_QUEUE_LENGTH + " pending calls to push are allowed on a single repeater.");
    }
    else if (r.state >= Stopped) {
        return Promise.resolve(undefined);
    }
    var valueP = r.pending === undefined
        ? Promise.resolve(value)
        : r.pending.then(function () { return value; });
    valueP = valueP.catch(function (err) {
        if (r.state < Stopped) {
            r.err = err;
        }
        reject(r);
        return undefined; // void :(
    });
    var nextP;
    if (r.nexts.length) {
        var next_1 = r.nexts.shift();
        next_1.resolve(createIteration(r, valueP));
        if (r.nexts.length) {
            nextP = Promise.resolve(r.nexts[0].value);
        }
        else {
            nextP = new Promise(function (resolve) { return (r.onnext = resolve); });
        }
    }
    else if (typeof r.buffer !== "undefined" && !r.buffer.full) {
        r.buffer.add(valueP);
        nextP = Promise.resolve(undefined);
    }
    else {
        nextP = new Promise(function (resolve) { return r.pushes.push({ resolve: resolve, value: valueP }); });
    }
    // If an error is thrown into the repeater via the next or throw methods, we give the repeater a chance to handle this by rejecting the promise returned from push. If the push call is not immediately handled we throw the next iteration of the repeater.
    // To check that the promise returned from push is floating, we modify the then and catch methods of the returned promise so that they flip the floating flag. The push function actually does not return a promise, because modern engines do not call the then and catch methods on native promises. By making next a plain old javascript object, we ensure that the then and catch methods will be called.
    var floating = true;
    var next = {};
    var unhandled = nextP.catch(function (err) {
        if (floating) {
            throw err;
        }
        return undefined; // void :(
    });
    next.then = function (onfulfilled, onrejected) {
        floating = false;
        return Promise.prototype.then.call(nextP, onfulfilled, onrejected);
    };
    next.catch = function (onrejected) {
        floating = false;
        return Promise.prototype.catch.call(nextP, onrejected);
    };
    next.finally = nextP.finally.bind(nextP);
    r.pending = valueP
        .then(function () { return unhandled; })
        .catch(function (err) {
        r.err = err;
        reject(r);
    });
    return next;
}
/**
 * Creates the stop callable promise which is passed to the executor
 */
function createStop(r) {
    var stop1 = stop.bind(null, r);
    var stopP = new Promise(function (resolve) { return (r.onstop = resolve); });
    stop1.then = stopP.then.bind(stopP);
    stop1.catch = stopP.catch.bind(stopP);
    stop1.finally = stopP.finally.bind(stopP);
    return stop1;
}
/**
 * Calls the executor passed into the constructor. This function is called the first time the next method is called on the repeater.
 *
 * Advances state to Started.
 */
function execute(r) {
    if (r.state >= Started) {
        return;
    }
    r.state = Started;
    var push1 = push.bind(null, r);
    var stop1 = createStop(r);
    r.execution = new Promise(function (resolve) { return resolve(r.executor(push1, stop1)); });
    // TODO: We should consider stopping all repeaters when the executor settles.
    r.execution.catch(function () { return stop(r); });
}
var records = new WeakMap();
// NOTE: While repeaters implement and are assignable to the AsyncGenerator interface, and you can use the types interchangeably, we don’t use typescript’s implements syntax here because this would make supporting earlier versions of typescript trickier. This is because TypeScript version 3.6 changed the iterator types by adding the TReturn and TNext type parameters.
var Repeater = /** @class */ (function () {
    function Repeater(executor, buffer) {
        records.set(this, {
            executor: executor,
            buffer: buffer,
            err: undefined,
            state: Initial,
            pushes: [],
            nexts: [],
            pending: undefined,
            execution: undefined,
            onnext: NOOP,
            onstop: NOOP,
        });
    }
    Repeater.prototype.next = function (value) {
        swallow(value);
        var r = records.get(this);
        if (r === undefined) {
            throw new Error("WeakMap error");
        }
        if (r.nexts.length >= MAX_QUEUE_LENGTH) {
            throw new RepeaterOverflowError("No more than " + MAX_QUEUE_LENGTH + " pending calls to next are allowed on a single repeater.");
        }
        if (r.state <= Initial) {
            execute(r);
        }
        r.onnext(value);
        if (typeof r.buffer !== "undefined" && !r.buffer.empty) {
            var result = createIteration(r, r.buffer.remove());
            if (r.pushes.length) {
                var push_2 = r.pushes.shift();
                r.buffer.add(push_2.value);
                r.onnext = push_2.resolve;
            }
            return result;
        }
        else if (r.pushes.length) {
            var push_3 = r.pushes.shift();
            r.onnext = push_3.resolve;
            return createIteration(r, push_3.value);
        }
        else if (r.state >= Stopped) {
            finish(r);
            return createIteration(r, consumeExecution(r));
        }
        return new Promise(function (resolve) { return r.nexts.push({ resolve: resolve, value: value }); });
    };
    Repeater.prototype.return = function (value) {
        swallow(value);
        var r = records.get(this);
        if (r === undefined) {
            throw new Error("WeakMap error");
        }
        finish(r);
        // We override the execution because return should always return the value passed in.
        r.execution = Promise.resolve(r.execution).then(function () { return value; });
        return createIteration(r, consumeExecution(r));
    };
    Repeater.prototype.throw = function (err) {
        var r = records.get(this);
        if (r === undefined) {
            throw new Error("WeakMap error");
        }
        if (r.state <= Initial ||
            r.state >= Stopped ||
            (typeof r.buffer !== "undefined" && !r.buffer.empty)) {
            finish(r);
            // If r.err is already set, that mean the repeater has already produced an error, so we throw that error rather than the error passed in, because doing so might be more informative for the caller.
            if (r.err == null) {
                r.err = err;
            }
            return createIteration(r, consumeExecution(r));
        }
        return this.next(Promise.reject(err));
    };
    Repeater.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    // TODO: Remove these static methods from the class.
    Repeater.race = race;
    Repeater.merge = merge;
    Repeater.zip = zip;
    Repeater.latest = latest;
    return Repeater;
}());
/*** COMBINATOR FUNCTIONS ***/
// TODO: move these combinators to their own file.
function getIterators(values, options) {
    var e_3, _a;
    var iters = [];
    var _loop_1 = function (value) {
        if (value != null && typeof value[Symbol.asyncIterator] === "function") {
            iters.push(value[Symbol.asyncIterator]());
        }
        else if (value != null && typeof value[Symbol.iterator] === "function") {
            iters.push(value[Symbol.iterator]());
        }
        else {
            iters.push((function valueToAsyncIterator() {
                return __asyncGenerator(this, arguments, function valueToAsyncIterator_1() {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!options.yieldValues) return [3 /*break*/, 3];
                                return [4 /*yield*/, __await(value)];
                            case 1: return [4 /*yield*/, _a.sent()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                if (!options.returnValues) return [3 /*break*/, 5];
                                return [4 /*yield*/, __await(value)];
                            case 4: return [2 /*return*/, _a.sent()];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            })());
        }
    };
    try {
        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
            var value = values_1_1.value;
            _loop_1(value);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return iters;
}
// NOTE: whenever you see any variables called `advance` or `advances`, know that it is a hack to get around the fact that `Promise.race` leaks memory. These variables are intended to be set to the resolve function of a promise which is constructed and awaited as an alternative to Promise.race. For more information, see this comment in the Node.js issue tracker: https://github.com/nodejs/node/issues/17469#issuecomment-685216777.
function race(contenders) {
    var _this = this;
    var iters = getIterators(contenders, { returnValues: true });
    return new Repeater(function (push, stop) { return __awaiter(_this, void 0, void 0, function () {
        var advance, stopped, finalIteration, iteration, i_1, _loop_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iters.length) {
                        stop();
                        return [2 /*return*/];
                    }
                    stopped = false;
                    stop.then(function () {
                        advance();
                        stopped = true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 5, 7]);
                    iteration = void 0;
                    i_1 = 0;
                    _loop_2 = function () {
                        var j, iters_1, iters_1_1, iter;
                        var e_4, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    j = i_1;
                                    try {
                                        for (iters_1 = (e_4 = void 0, __values(iters)), iters_1_1 = iters_1.next(); !iters_1_1.done; iters_1_1 = iters_1.next()) {
                                            iter = iters_1_1.value;
                                            Promise.resolve(iter.next()).then(function (iteration) {
                                                if (iteration.done) {
                                                    stop();
                                                    if (finalIteration === undefined) {
                                                        finalIteration = iteration;
                                                    }
                                                }
                                                else if (i_1 === j) {
                                                    // This iterator has won, advance i and resolve the promise.
                                                    i_1++;
                                                    advance(iteration);
                                                }
                                            }, function (err) { return stop(err); });
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (iters_1_1 && !iters_1_1.done && (_a = iters_1.return)) _a.call(iters_1);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    return [4 /*yield*/, new Promise(function (resolve) { return (advance = resolve); })];
                                case 1:
                                    iteration = _b.sent();
                                    if (!(iteration !== undefined)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, push(iteration.value)];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 2;
                case 2:
                    if (!!stopped) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/, finalIteration && finalIteration.value];
                case 5:
                    stop();
                    return [4 /*yield*/, Promise.race(iters.map(function (iter) { return iter.return && iter.return(); }))];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
function merge(contenders) {
    var _this = this;
    var iters = getIterators(contenders, { yieldValues: true });
    return new Repeater(function (push, stop) { return __awaiter(_this, void 0, void 0, function () {
        var advances, stopped, finalIteration;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iters.length) {
                        stop();
                        return [2 /*return*/];
                    }
                    advances = [];
                    stopped = false;
                    stop.then(function () {
                        var e_5, _a;
                        stopped = true;
                        try {
                            for (var advances_1 = __values(advances), advances_1_1 = advances_1.next(); !advances_1_1.done; advances_1_1 = advances_1.next()) {
                                var advance = advances_1_1.value;
                                advance();
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (advances_1_1 && !advances_1_1.done && (_a = advances_1.return)) _a.call(advances_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, Promise.all(iters.map(function (iter, i) { return __awaiter(_this, void 0, void 0, function () {
                            var iteration, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, , 6, 9]);
                                        _b.label = 1;
                                    case 1:
                                        if (!!stopped) return [3 /*break*/, 5];
                                        Promise.resolve(iter.next()).then(function (iteration) { return advances[i](iteration); }, function (err) { return stop(err); });
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                advances[i] = resolve;
                                            })];
                                    case 2:
                                        iteration = _b.sent();
                                        if (!(iteration !== undefined)) return [3 /*break*/, 4];
                                        if (iteration.done) {
                                            finalIteration = iteration;
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, push(iteration.value)];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4: return [3 /*break*/, 1];
                                    case 5: return [3 /*break*/, 9];
                                    case 6:
                                        _a = iter.return;
                                        if (!_a) return [3 /*break*/, 8];
                                        return [4 /*yield*/, iter.return()];
                                    case 7:
                                        _a = (_b.sent());
                                        _b.label = 8;
                                    case 8:
                                        return [7 /*endfinally*/];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, finalIteration && finalIteration.value];
                case 3:
                    stop();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function zip(contenders) {
    var _this = this;
    var iters = getIterators(contenders, { returnValues: true });
    return new Repeater(function (push, stop) { return __awaiter(_this, void 0, void 0, function () {
        var advance, stopped, iterations, values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iters.length) {
                        stop();
                        return [2 /*return*/, []];
                    }
                    stopped = false;
                    stop.then(function () {
                        advance();
                        stopped = true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 6, 8]);
                    _a.label = 2;
                case 2:
                    if (!!stopped) return [3 /*break*/, 5];
                    Promise.all(iters.map(function (iter) { return iter.next(); })).then(function (iterations) { return advance(iterations); }, function (err) { return stop(err); });
                    return [4 /*yield*/, new Promise(function (resolve) { return (advance = resolve); })];
                case 3:
                    iterations = _a.sent();
                    if (iterations === undefined) {
                        return [2 /*return*/];
                    }
                    values = iterations.map(function (iteration) { return iteration.value; });
                    if (iterations.some(function (iteration) { return iteration.done; })) {
                        return [2 /*return*/, values];
                    }
                    return [4 /*yield*/, push(values)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    stop();
                    return [4 /*yield*/, Promise.all(iters.map(function (iter) { return iter.return && iter.return(); }))];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); });
}
function latest(contenders) {
    var _this = this;
    var iters = getIterators(contenders, {
        yieldValues: true,
        returnValues: true,
    });
    return new Repeater(function (push, stop) { return __awaiter(_this, void 0, void 0, function () {
        var advance, advances, stopped, iterations_1, values_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iters.length) {
                        stop();
                        return [2 /*return*/, []];
                    }
                    advances = [];
                    stopped = false;
                    stop.then(function () {
                        var e_6, _a;
                        advance();
                        try {
                            for (var advances_2 = __values(advances), advances_2_1 = advances_2.next(); !advances_2_1.done; advances_2_1 = advances_2.next()) {
                                var advance1 = advances_2_1.value;
                                advance1();
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (advances_2_1 && !advances_2_1.done && (_a = advances_2.return)) _a.call(advances_2);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        stopped = true;
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 5, 7]);
                    Promise.all(iters.map(function (iter) { return iter.next(); })).then(function (iterations) { return advance(iterations); }, function (err) { return stop(err); });
                    return [4 /*yield*/, new Promise(function (resolve) { return (advance = resolve); })];
                case 2:
                    iterations_1 = _a.sent();
                    if (iterations_1 === undefined) {
                        return [2 /*return*/];
                    }
                    values_2 = iterations_1.map(function (iteration) { return iteration.value; });
                    if (iterations_1.every(function (iteration) { return iteration.done; })) {
                        return [2 /*return*/, values_2];
                    }
                    // We continuously yield and mutate the same values array so we shallow copy it each time it is pushed.
                    return [4 /*yield*/, push(values_2.slice())];
                case 3:
                    // We continuously yield and mutate the same values array so we shallow copy it each time it is pushed.
                    _a.sent();
                    return [4 /*yield*/, Promise.all(iters.map(function (iter, i) { return __awaiter(_this, void 0, void 0, function () {
                            var iteration;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (iterations_1[i].done) {
                                            return [2 /*return*/, iterations_1[i].value];
                                        }
                                        _a.label = 1;
                                    case 1:
                                        if (!!stopped) return [3 /*break*/, 4];
                                        Promise.resolve(iter.next()).then(function (iteration) { return advances[i](iteration); }, function (err) { return stop(err); });
                                        return [4 /*yield*/, new Promise(function (resolve) { return (advances[i] = resolve); })];
                                    case 2:
                                        iteration = _a.sent();
                                        if (iteration === undefined) {
                                            return [2 /*return*/, iterations_1[i].value];
                                        }
                                        else if (iteration.done) {
                                            return [2 /*return*/, iteration.value];
                                        }
                                        values_2[i] = iteration.value;
                                        return [4 /*yield*/, push(values_2.slice())];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    stop();
                    return [4 /*yield*/, Promise.all(iters.map(function (iter) { return iter.return && iter.return(); }))];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toLowerCase());
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    env: {},
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

function renderAsync(fn, options) {
  return () => async (event) => {
    let pageEvent = createPageEvent(event);
    let markup = await renderToStringAsync(() => fn(pageEvent), options);
    if (pageEvent.routerContext.url) {
      return redirect(pageEvent.routerContext.url, {
        headers: pageEvent.responseHeaders
      });
    }
    markup = handleIslandsRouting(pageEvent, markup);
    return new Response(markup, {
      status: pageEvent.getStatusCode(),
      headers: pageEvent.responseHeaders
    });
  };
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath,
    routerContext: {},
    tags: [],
    env: event.env,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];

const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");

const MetaProvider = props => {
  const cascadedTagInstances = new Map(); // TODO: use one element for all tags of the same type, just swap out

  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);

      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }

        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag]; // track indices synchronously

        cascadedTagInstances.set(tagType, instances);

        return index;
      }

      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);

      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);

        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);

            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }

          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };

  {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props; // tweak only cascading tags

      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });

        if (index !== -1) {
          tags.splice(index, 1);
        }
      }

      tags.push(tagDesc);
    };

    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }

  return createComponent(MetaContext.Provider, {
    value: actions,

    get children() {
      return props.children;
    }

  });
};

const MetaTag = (tag, props) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    id,

    get name() {
      return props.name || props.property;
    }

  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) ;
  });

  {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${tag.props[k]}"`).join("");
    return tag.props.children ? `<${tag.tag} data-sm="${tag.id}"${props}>${// Tags might contain multiple text children:
    //   <Title>example - {myCompany}</Title>
    Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children}</${tag.tag}>` : `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props);
const Meta$1 = props => MetaTag("meta", props);
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|\/+$/g;
function normalize(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalize(base);
    const fromPath = from && normalize(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalize(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalize(from).replace(/\/*(\*.*)?$/g, "") + normalize(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function urlDecode(str, isQuery) {
    return decodeURIComponent(isQuery ? str.replace(/\+/g, " ") : str);
}
function createMatcher(path, partial) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            if (segment[0] === ":") {
                match.params[segment.slice(1)] = locSegment;
            }
            else if (segment.localeCompare(locSegment, undefined, { sensitivity: "base" }) !== 0) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            match.params[splat] = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
        }
        return match;
    };
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                if (def.children) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin);
    const pathname = createMemo(() => urlDecode(url().pathname));
    const search = createMemo(() => urlDecode(url().search, true));
    const hash = createMemo(() => urlDecode(url().hash));
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const basePath = resolvePath("", base);
    const output = out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, start] = useTransition();
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory
    };
}
function createRouteContext(router, parent, child, match) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    const params = createMemoObject(() => match().params);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (staticIntegration({
    value: url || ""
  }) );
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,

    get children() {
      return props.children;
    }

  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));

  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }

  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];

    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];

      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;

        if (disposers[i]) {
          disposers[i]();
        }

        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i]);
        });
      }
    }

    disposers.splice(nextMatches.length).forEach(dispose => dispose());

    if (prev && equal) {
      return prev;
    }

    root = next[0];
    return next;
  }));
  return createComponent(Show, {
    get when() {
      return routeStates() && root;
    },

    children: route => createComponent(RouteContextObj.Provider, {
      value: route,

      get children() {
        return route.outlet();
      }

    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show, {
    get when() {
      return route.child;
    },

    children: child => createComponent(RouteContextObj.Provider, {
      value: child,

      get children() {
        return child.outlet();
      }

    })
  });
};

class ServerError extends Error {
  constructor(message, {
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";

    if (stack) {
      this.stack = stack;
    }
  }

}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }

}

const ServerContext = createContext({});

function Routes(props) {

  return createComponent(Routes$1, {
    get children() {
      return props.children;
    }

  });
}

const _tmpl$$2 = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: e => {
      return createComponent(Show, {
        get when() {
          return !props.fallback;
        },

        get fallback() {
          return props.fallback(e);
        },

        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }

      });
    },

    get children() {
      return props.children;
    }

  });
}

function ErrorMessage(props) {
  return ssr(_tmpl$$2, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const _tmpl$$1 = ["<div", "><h1>hello</h1><!--#-->", "<!--/--></div>"],
      _tmpl$2$1 = ["<pre", ">", "</pre>"];
const gql = String.raw;
function Home() {
  const [mounted, setMount] = createSignal(false);
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return mounted();
    },

    get children() {
      return createComponent(GqlQueryTest, {});
    }

  })));
}
const GqlQueryTest = props => {
  const [result, status] = createResource(() => distExports.request("/graphql", gql`
        {
          hello
        }
      `));

  const data = () => result.latest ? JSON.stringify(result.latest) : undefined;

  return ssr(_tmpl$2$1, ssrHydrationKey(), escape(data));
};

/// <reference path="../server/types.tsx" />
const routesConfig = {
  routes: [{
    component: Home,
    path: "/"
  }],
  routeLayouts: {
    "/": {
      "id": "/",
      "layouts": []
    }
  }
};
/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return routesConfig.routes;
};

const _tmpl$ = ["<link", " rel=\"stylesheet\"", ">"],
      _tmpl$2 = ["<link", " rel=\"modulepreload\"", ">"];

function getAssetsFromManifest(manifest, routerContext) {
  const match = routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routesConfig.routeLayouts[fullPath];

      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }

    return memo;
  }, []);
  match.push(...(manifest["entry-client"] || []));
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}
/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */


function Links() {
  const context = useContext(ServerContext);
  return createComponent(Assets, {
    get children() {
      return getAssetsFromManifest(context.env.manifest, context.routerContext);
    }

  });
}

function Meta() {
  const context = useContext(ServerContext); // @ts-expect-error The ssr() types do not match the Assets child types

  return createComponent(Assets, {
    get children() {
      return ssr(renderTags(context.tags));
    }

  });
}

const _tmpl$4 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent(HydrationScript, {}), isIslands , createComponent(NoHydration, {
    get children() {
      return (ssr(_tmpl$4, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }

  }), isDev ];
}

function Html(props) {

  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [props.children, createComponent(Meta, {}), createComponent(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => props.children , false);
  }
}

function Root() {
  return createComponent(Html, {
    lang: "en",

    get children() {
      return [createComponent(Head, {
        get children() {
          return [createComponent(Title, {
            children: "SolidStart - With TailwindCSS"
          }), createComponent(Meta$1, {
            charset: "utf-8"
          }), createComponent(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          })];
        }

      }), createComponent(Body, {
        get children() {
          return [createComponent(Suspense, {
            get children() {
              return createComponent(ErrorBoundary, {
                get children() {
                  return createComponent(Routes, {
                    get children() {
                      return createComponent(FileRoutes, {});
                    }

                  });
                }

              });
            }

          }), createComponent(Scripts, {})];
        }

      })];
    }

  });
}

const server$1 = createServer({
  schema: {
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!"
      }
    }
  }
});
const handler = ({ request }) => {
  return server$1.handleRequest(request);
};
const get = handler;
const post = handler;

const api = [
  {
    get: get,
    post: post,
    path: "/graphql"
  },
  {
    get: "skip",
    path: "/"
  }
];
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = route.path.endsWith("/") ? 4 : 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toLowerCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};

const server$ = (fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "fetch_event") {
            return event;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        let e = await _fn.call(ctx, ...args);
        return e;
      } catch (e) {
        if (/[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer")).pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

const rootData = Object.values(/* #__PURE__ */ Object.assign({}))[0];
const dataFn = rootData ? rootData.default : undefined;
/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware([apiRoutes, inlineServerFunctions, ...exchanges]);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {

  return createComponent(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;
  sharedConfig.context.requestContext = event;
  return createComponent(ServerContext.Provider, {
    value: event,

    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return event.tags;
        },

        get children() {
          return createComponent(StartRouter, {
            url: path,

            get out() {
              return event.routerContext;
            },

            location: path,

            get prevLocation() {
              return event.prevUrl;
            },

            data: dataFn,

            get routes() {
              return routesConfig.routes;
            },

            get children() {
              return [docType, createComponent(Root, {})];
            }

          });
        }

      });
    }

  });
}

const entryServer = createHandler(renderAsync(event => createComponent(StartServer, {
  event: event
})));

const assetManifest = JSON.parse(manifestJSON);

var server = {
  async fetch(request, env, ctx) {
    if (request.headers.get("Upgrade") === "websocket") {
      const url = new URL(request.url);
      const durableObjectId = env.DO_WEBSOCKET.idFromName(url.pathname + url.search);
      const durableObjectStub = env.DO_WEBSOCKET.get(durableObjectId);
      const response = await durableObjectStub.fetch(request);
      return response;
    }

    env.manifest = manifest;
    env.getStaticAsset = async request => {
      return await dist$1.getAssetFromKV(
        {
          request,
          waitUntil(promise) {
            return ctx.waitUntil(promise);
          }
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest
        }
      );
    };

    env.getStaticHTML = async path => {
      return await env.getStaticAsset(new Request(new URL(path + ".html", request.url.toString())));
    };

    try {
      return await env.getStaticAsset(request);
    } catch (e) {
      if (!(e instanceof dist$1.NotFoundError || e instanceof dist$1.MethodNotAllowedError)) {
        return new Response("An unexpected error occurred", { status: 500 });
      }
    }
    return entryServer({
      request: request,
      env
    });
  }
};

export { server as default };
