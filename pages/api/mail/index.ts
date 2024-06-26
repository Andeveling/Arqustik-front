import { WindowI } from '@models/WindowPVC.model';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import mail from '@sendgrid/mail';
import { currencyFormatter } from '@utils/currencyFormatter';
import { arqustikConfig } from 'arqustik.config';
import { NextApiHandler } from 'next';

mail.setApiKey(arqustikConfig.SENDGRID_API_KEY);

const handler: NextApiHandler = async (req, res) => {
  try {
    const { method } = req;
    const { body } = req;

    switch (method) {
      case 'POST':
        const message = `Hola`;
        const data: MailDataRequired = {
          from: 'comercial1@arqustik.com',
          to: body.email,
          subject: `Cotización Arqustik`,
          text: message,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />

    <style type="text/css">
      body,
      p,
      div {
        font-family: inherit;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>

    <link href="https://fonts.googleapis.com/css?family=Lato:300&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: "Lato", sans-serif;
      }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#f3f3f3;"
    >
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f3f3f3">
          <tr>
            <td valign="top" bgcolor="#f3f3f3" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="padding: 0px 0px 0px 0px; color: #000000; text-align: left"
                                bgcolor="#FFFFFF"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 30px 0px 30px 0px"
                                  bgcolor="#f2eefb"
                                  data-distribution="1"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="600"
                                          style="
                                            width: 600px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 0px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="padding: 0px; margin: 0px; border-spacing: 0">
                                                <table
                                                  class="wrapper"
                                                  role="module"
                                                  data-type="image"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="79178f70-3054-4e9f-9b29-edfe3988719e"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          font-size: 6px;
                                                          line-height: 10px;
                                                          padding: 0px 0px 0px 0px;
                                                        "
                                                        valign="top"
                                                        align="center"
                                                      >
                                                        <img
                                                          class="max-width"
                                                          border="0"
                                                          style="
                                                            display: block;
                                                            color: #000000;
                                                            text-decoration: none;
                                                            font-family: Helvetica, arial, sans-serif;
                                                            font-size: 16px;
                                                          "
                                                          width="68"
                                                          alt=""
                                                          data-proportionally-constrained="true"
                                                          data-responsive="false"
                                                          src="https://arqustik.com/wp-content/uploads/2022/12/Logo-en-PNG-1-1.png"
                                                          height="43"
                                                        />
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 50px 20px 10px 20px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: center">
                                            <span style="font-size: 28px; font-family: inherit">Cotización</span>
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 20px 10px 20px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      ></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 20px 20px 10px 20px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: center">
                                            ¡Hola ${req.body.fullName}, gracias por contactarnos!
                                          </div>
                                          <div style="font-family: inherit; text-align: center"><br /></div>
                                          <div style="font-family: inherit; text-align: center">
                                          Soy Marcela Gomez, asesora de Arqustik Vitruvio es un gusto ofrecerle mi ayuda.
                                            De acuerdo a sus indicaciones, le presentamos la oferta de productos que
                                            solicitó. Agradecemos la confianza depositada en nuestra compañía y le
                                            invitamos a leer el contenido de esta propuesta. Quedamos a su disposición
                                            para aclarar cualquier inquietud y a la espera de una respuesta positiva que
                                            nos convierta en su aliado en el proceso.
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="8395333d-62e9-4e61-957d-72d0eefc1a4f"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="padding: 0px 0px 30px 0px" role="module-content" bgcolor=""></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f612db9d-7563-4153-b3d5-8a0015929def"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 18px 30px 18px 40px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            <span style="font-size: 28px">Información de Cotización</span>
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="divider"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 30px 0px 40px"
                                        role="module-content"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          height="1px"
                                          style="line-height: 1px; font-size: 1px"
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="padding: 0px 0px 1px 0px" bgcolor="#000000"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 30px 20px 30px 40px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            ${req.body.fullName}
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            cel: ${req.body.cellphone}
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            Dirección: ${req.body.address}
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            email: ${req.body.email}
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="62f97064-56bb-4931-a415-90b0a17edfc1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 40px 0px 40px 40px;
                                          line-height: 22px;
                                          text-align: inherit;
                                          background-color: #ebf7ff;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor="#ebf7ff"
                                        role="module-content"
                                      >
                                        <div>
                                         
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table><table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 18px 30px 18px 40px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            <span style="font-size: 28px">Condiciones</span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="divider"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1.1"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 30px 0px 40px"
                                        role="module-content"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          height="1px"
                                          style="line-height: 1px; font-size: 1px"
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="padding: 0px 0px 1px 0px" bgcolor="#000000"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 30px 20px 30px 40px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit; font-weight: bold">
                                            Forma de Pago:
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">70% Anticipo</div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            30% Avance de Obra
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit; font-weight: bold">
                                            Tiempo de entrega:
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            A partir de 45 Días hábiles después de realizado el anticipo y enviadas las
                                            medidas definitivas de fabricación (acta de vanos)
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit; font-weight: bold">
                                            Validez de la oferta:
                                          </div>
                                          <div style="font-family: inherit; text-align: inherit">5 dias habiles</div>
                                          <div style="font-family: inherit; text-align: inherit"><br /></div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 18px 30px 18px 40px; line-height: 22px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: inherit">
                                            <span style="font-size: 28px">Resumen</span>
                                          </div>
                                          <div>
                                            <table
                                              class="module"
                                              role="module"
                                              data-type="text"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              style="table-layout: fixed"
                                              data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1.1"
                                              data-mc-module-version="2019-10-22"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      padding: 30px 20px 30px 40px;
                                                      line-height: 22px;
                                                      text-align: inherit;
                                                    "
                                                    height="100%"
                                                    valign="top"
                                                    bgcolor=""
                                                    role="module-content"
                                                  >
                                                    <div style="display: block">
                                                      <div
                                                        style="
                                                          font-family: inherit;
                                                          text-align: inherit;
                                                          display: flex;
                                                          justify-content: space-between;
                                                        "
                                                      >
                                                       <span>Subtotal:</span>
                                                        <span>${req.body.subTotal}</span>
                                                      </div>
                                                      <div
                                                        style="
                                                          font-family: inherit;
                                                          text-align: inherit;
                                                          display: flex;
                                                          justify-content: space-between;
                                                        "
                                                      >
                                                        <span>IVA 19%</span>
                                                        <span>${req.body.iva}</span>
                                                      </div>
                                                      <div
                                                        style="
                                                          font-family: inherit;
                                                          text-align: inherit;
                                                          display: flex;
                                                          justify-content: space-between;
                                                        "
                                                      >
                                                        Total:
                                                        <span>
                                                        <span>Total:</span>
                                                        <strong>${req.body.total}</strong>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="divider"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 0px 30px 0px 40px"
                                        role="module-content"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                      >
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          height="1px"
                                          style="line-height: 1px; font-size: 1px"
                                        >
                                          <tbody>
                                            <tr>
                                              <td style="padding: 0px 0px 1px 0px" bgcolor="#000000"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="10dfe38b-ab1a-4083-80ca-725cb09e3c1c.1"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="padding: 0px 0px 30px 0px" role="module-content" bgcolor=""></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1.1"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding: 18px 30px 18px 40px; line-height: 28px; text-align: inherit"
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div style="font-family: inherit; text-align: center">
                                            <span style="font-size: 28px"
                                              >Si tienes alguna pregunta no dudes en contactarnos</span
                                            >
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="module"
                                  data-role="module-button"
                                  data-type="button"
                                  role="module"
                                  style="table-layout: fixed"
                                  width="100%"
                                  data-muid="c588d3be-b94e-451d-b994-c67321eff57f"
                                >
                                  <tbody>
                                    <tr>
                                      <td align="center" bgcolor="" class="outer-td" style="padding: 0px 0px 0px 0px">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="wrapper-mobile"
                                          style="text-align: center"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                align="center"
                                                bgcolor="#ebf7ff"
                                                class="inner-td"
                                                style="
                                                  border-radius: 6px;
                                                  font-size: 16px;
                                                  text-align: center;
                                                  background-color: inherit;
                                                "
                                              >
                                                <a
                                                  href="comercial1@arqustik.com"
                                                  style="
                                                    background-color: #ebf7ff;
                                                    border: 1px solid #ebf7ff;
                                                    border-color: #ebf7ff;
                                                    border-radius: 0px;
                                                    border-width: 1px;
                                                    color: #000000;
                                                    display: inline-block;
                                                    font-size: 14px;
                                                    font-weight: bold;
                                                    letter-spacing: 0px;
                                                    line-height: normal;
                                                    padding: 12px 18px 12px 18px;
                                                    text-align: center;
                                                    text-decoration: none;
                                                    border-style: solid;
                                                    width: 210px;
                                                    font-family: inherit;
                                                  "
                                                  target="_blank"
                                                  >Contacto</a
                                                >
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="spacer"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="0a0f7040-0a2f-4749-8f52-03f4bfb4f161"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="padding: 0px 0px 30px 0px" role="module-content" bgcolor=""></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  data-role="module-unsubscribe"
                                  class="module"
                                  role="module"
                                  data-type="unsubscribe"
                                  style="
                                    color: #444444;
                                    font-size: 12px;
                                    line-height: 20px;
                                    padding: 16px 16px 16px 16px;
                                    text-align: Center;
                                  "
                                  data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                >
                                  <div class="Unsubscribe--addressLine">
                                  <p class="Unsubscribe--senderName" style="font-size: 12px">
                                      Marcela Gomez
                                    </p>
                                    <p class="Unsubscribe--senderName" style="font-size: 12px">
                                      Móvil: +57 300 465 3936
                                    </p>
                                    <p class="Unsubscribe--senderName" style="font-size: 12px; line-height: 20px">
                                      <a href="https://arqustik.com/">www.arqustik.com</a>
                                    </p>
                                    <p style="font-size: 12px; line-height: 20px">
                                      <span class="Unsubscribe--senderAddress">comercial1@arqustik.com</span>
                                      <span class="Unsubscribe--senderCity"> La Dolores, Palmira</span>,
                                      <span class="Unsubscribe--senderState">Valle del cauca</span>
                                    </p>
                                  </div>
                                </div>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="module"
                                  data-role="module-button"
                                  data-type="button"
                                  role="module"
                                  style="table-layout: fixed"
                                  width="100%"
                                  data-muid="de63a5a7-03eb-460a-97c7-d2535151ca0b"
                                >
                                  <tbody>
                                    <tr>
                                      <td align="center" bgcolor="" class="outer-td" style="padding: 0px 0px 20px 0px">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="wrapper-mobile"
                                          style="text-align: center"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                align="center"
                                                bgcolor="#f5f8fd"
                                                class="inner-td"
                                                style="
                                                  border-radius: 6px;
                                                  font-size: 16px;
                                                  text-align: center;
                                                  background-color: inherit;
                                                "
                                              >
                                                <a
                                                  href="https://sendgrid.com/"
                                                  style="
                                                    background-color: #f5f8fd;
                                                    border: 1px solid #f5f8fd;
                                                    border-color: #f5f8fd;
                                                    border-radius: 25px;
                                                    border-width: 1px;
                                                    color: #a8b9d5;
                                                    display: inline-block;
                                                    font-size: 10px;
                                                    font-weight: normal;
                                                    letter-spacing: 0px;
                                                    line-height: normal;
                                                    padding: 5px 18px 5px 18px;
                                                    text-align: center;
                                                    text-decoration: none;
                                                    border-style: solid;
                                                    font-family: helvetica, sans-serif;
                                                  "
                                                  target="_blank"
                                                  >Arqustik SAS</a
                                                >
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`,
        };

        await mail.send(data).catch((err) => console.log(err));
        res.status(200).json({ message: 'mail sended' });
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getWindows = (windows: WindowI[]): string => {
  let windowsPVC = [];
  windowsPVC = windows.map(
    ({ title, width, height, cant, price, model }: WindowI) =>
      `<div class="grid grid-cols-1 gap-8 p-8 border"><div class="grid grid-cols-1 gap-4"><div class="grid gap-2 grid-cols-4 justify-between text-left"><strong>Referencia ${title}</strong><p>Model: ${model}</p><p>Ancho: ${width}mm</p><p>Alto: ${height}mm</p></div><div class="grid gap-4 grid-cols-4 justify-between text-left"><strong>Detalles</strong><p>Price: ${currencyFormatter(
        price,
      )}</p><p>Cant: ${cant}</p><p>Subtotal: ${currencyFormatter(cant * price)}</p></div></div></div>`,
  );
  return windowsPVC.join('').toString();
};

export default handler;
