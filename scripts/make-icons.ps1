Add-Type -AssemblyName System.Drawing

function Generate-PwaIcon($size, $outputPath) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # Background cream
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $brushBg = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFF9F4"))
    $g.FillRectangle($brushBg, $rect)

    # Blue rounded squircle
    $pad = [int]($size * 0.08)
    $innerSize = $size - (2 * $pad)
    $innerRect = New-Object System.Drawing.Rectangle $pad, $pad, $innerSize, $innerSize
    $brushBlue = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#3975EA"))
    
    $radius = [int]($size * 0.22)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($innerRect.X, $innerRect.Y, $radius * 2, $radius * 2, 180, 90)
    $path.AddArc(($innerRect.Right - ($radius * 2)), $innerRect.Y, $radius * 2, $radius * 2, 270, 90)
    $path.AddArc(($innerRect.Right - ($radius * 2)), ($innerRect.Bottom - ($radius * 2)), $radius * 2, $radius * 2, 0, 90)
    $path.AddArc($innerRect.X, ($innerRect.Bottom - ($radius * 2)), $radius * 2, $radius * 2, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brushBlue, $path)

    # Heart shape on top
    $heartBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFC5AD"))
    $hx = $size * 0.5
    $hy = $size * 0.32
    $hs = $size * 0.12
    # Draw two circles and triangle for heart
    $g.FillEllipse($heartBrush, [float]($hx - $hs), [float]($hy - $hs * 0.6), [float]($hs), [float]($hs))
    $g.FillEllipse($heartBrush, [float]($hx), [float]($hy - $hs * 0.6), [float]($hs), [float]($hs))
    $heartPoly = @(
        [System.Drawing.PointF]::new([float]($hx - $hs * 0.98), [float]($hy)),
        [System.Drawing.PointF]::new([float]($hx + $hs * 0.98), [float]($hy)),
        [System.Drawing.PointF]::new([float]($hx), [float]($hy + $hs * 1.1))
    )
    $g.FillPolygon($heartBrush, $heartPoly)

    # Bowl body (white / cream semi-circle)
    $bowlWidth = [float]($size * 0.54)
    $bowlHeight = [float]($size * 0.27)
    $bx = [float](($size - $bowlWidth) / 2)
    $by = [float]($size * 0.52)
    $brushCream = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFE8DD"))
    $g.FillPie($brushCream, $bx, ($by - $bowlHeight), $bowlWidth, ($bowlHeight * 2), [float]0, [float]180)

    # Bowl rim line
    $penRim = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FFFFFF"), [float]($size * 0.025))
    $g.DrawLine($penRim, $bx, $by, ($bx + $bowlWidth), $by)

    # Bowl foot base
    $footW = [float]($size * 0.22)
    $footH = [float]($size * 0.05)
    $footX = [float](($size - $footW) / 2)
    $footY = [float]($by + $bowlHeight - ($footH * 0.5))
    $brushFoot = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#FFFFFF"))
    $g.FillRectangle($brushFoot, $footX, $footY, $footW, $footH)

    # Steam waves
    $penSteam = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#FFE8DD"), [float]($size * 0.02))
    $g.DrawArc($penSteam, [float]($size * 0.32), [float]($size * 0.38), [float]($size * 0.08), [float]($size * 0.12), [float]220, [float]180)
    $g.DrawArc($penSteam, [float]($size * 0.60), [float]($size * 0.38), [float]($size * 0.08), [float]($size * 0.12), [float]140, [float]180)

    # Save PNG
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Success: Generated $outputPath ($size x $size)"
}

Generate-PwaIcon 192 "public/pwa-192x192.png"
Generate-PwaIcon 512 "public/pwa-512x512.png"
Generate-PwaIcon 180 "public/apple-touch-icon.png"
