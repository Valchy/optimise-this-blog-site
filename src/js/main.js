!(function (o) {
  'use strict'
  ;(o.fn.fitVids = function (t) {
    var e,
      i,
      s = { customSelector: null, ignore: null }
    return (
      document.getElementById('fit-vids-style') ||
        ((e = document.head || document.getElementsByTagName('head')[0]),
        ((i = document.createElement('div')).innerHTML =
          '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
        e.appendChild(i.childNodes[1])),
      t && o.extend(s, t),
      this.each(function () {
        var t = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          'object',
          'embed',
        ]
        s.customSelector && t.push(s.customSelector)
        var n = '.fitvidsignore'
        s.ignore && (n = n + ', ' + s.ignore)
        t = o(this).find(t.join(','))
        ;(t = (t = t.not('object object')).not(n)).each(function () {
          var t,
            e,
            i = o(this)
          0 < i.parents(n).length ||
            ('embed' === this.tagName.toLowerCase() &&
              i.parent('object').length) ||
            i.parent('.fluid-width-video-wrapper').length ||
            (i.css('height') ||
              i.css('width') ||
              (!isNaN(i.attr('height')) && !isNaN(i.attr('width'))) ||
              (i.attr('height', 9), i.attr('width', 16)),
            (t =
              ('object' === this.tagName.toLowerCase() ||
              (i.attr('height') && !isNaN(parseInt(i.attr('height'), 10)))
                ? parseInt(i.attr('height'), 10)
                : i.height()) /
              (isNaN(parseInt(i.attr('width'), 10))
                ? i.width()
                : parseInt(i.attr('width'), 10))),
            i.attr('name') ||
              ((e = 'fitvid' + o.fn.fitVids._count),
              i.attr('name', e),
              o.fn.fitVids._count++),
            i
              .wrap('<div class="fluid-width-video-wrapper"></div>')
              .parent('.fluid-width-video-wrapper')
              .css('padding-top', 100 * t + '%'),
            i.removeAttr('height').removeAttr('width'))
        })
      })
    )
  }),
    (o.fn.fitVids._count = 0)
})(window.jQuery || window.Zepto)
var objectFitImages = (function () {
  'use strict'
  var a = 'bfred-it:object-fit-images',
    l = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
    t = new Image(),
    c = 'object-fit' in t.style,
    s = 'object-position' in t.style,
    o = 'background-size' in t.style,
    u = 'string' == typeof t.currentSrc,
    h = t.getAttribute,
    d = t.setAttribute,
    r = !1
  function p(t, e, i) {
    i =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
      (e || 1) +
      "' height='" +
      (i || 0) +
      "'%3E%3C/svg%3E"
    h.call(t, 'src') !== i && d.call(t, 'src', i)
  }
  function m(t, e) {
    t.naturalWidth ? e(t) : setTimeout(m, 100, t, e)
  }
  function A(e) {
    var i,
      n,
      t,
      s,
      o = (function (t) {
        for (
          var e, i = getComputedStyle(t).fontFamily, n = {};
          null !== (e = l.exec(i));

        )
          n[e[1]] = e[2]
        return n
      })(e),
      r = e[a]
    if (((o['object-fit'] = o['object-fit'] || 'fill'), !r.img)) {
      if ('fill' === o['object-fit']) return
      if (!r.skipTest && c && !o['object-position']) return
    }
    if (!r.img) {
      ;(r.img = new Image(e.width, e.height)),
        (r.img.srcset = h.call(e, 'data-ofi-srcset') || e.srcset),
        (r.img.src = h.call(e, 'data-ofi-src') || e.src),
        d.call(e, 'data-ofi-src', e.src),
        e.srcset && d.call(e, 'data-ofi-srcset', e.srcset),
        p(e, e.naturalWidth || e.width, e.naturalHeight || e.height),
        e.srcset && (e.srcset = '')
      try {
        ;(i = e),
          (n = {
            get: function (t) {
              return i[a].img[t || 'src']
            },
            set: function (t, e) {
              return (
                (i[a].img[e || 'src'] = t),
                d.call(i, 'data-ofi-' + e, t),
                A(i),
                t
              )
            },
          }),
          Object.defineProperty(i, 'src', n),
          Object.defineProperty(i, 'currentSrc', {
            get: function () {
              return n.get('currentSrc')
            },
          }),
          Object.defineProperty(i, 'srcset', {
            get: function () {
              return n.get('srcset')
            },
            set: function (t) {
              return n.set(t, 'srcset')
            },
          })
      } catch (t) {
        window.console && console.log('http://bit.ly/ofi-old-browser')
      }
    }
    ;(t = r.img).srcset &&
      !u &&
      window.picturefill &&
      ((t[(s = window.picturefill._).ns] && t[s.ns].evaled) ||
        s.fillImg(t, { reselect: !0 }),
      t[s.ns].curSrc ||
        ((t[s.ns].supported = !1), s.fillImg(t, { reselect: !0 })),
      (t.currentSrc = t[s.ns].curSrc || t.src)),
      (e.style.backgroundImage =
        'url(' +
        (r.img.currentSrc || r.img.src)
          .replace('(', '%28')
          .replace(')', '%29') +
        ')'),
      (e.style.backgroundPosition = o['object-position'] || 'center'),
      (e.style.backgroundRepeat = 'no-repeat'),
      /scale-down/.test(o['object-fit'])
        ? m(r.img, function () {
            r.img.naturalWidth > e.width || r.img.naturalHeight > e.height
              ? (e.style.backgroundSize = 'contain')
              : (e.style.backgroundSize = 'auto')
          })
        : (e.style.backgroundSize = o['object-fit']
            .replace('none', 'auto')
            .replace('fill', '100% 100%')),
      m(r.img, function (t) {
        p(e, t.naturalWidth, t.naturalHeight)
      })
  }
  function f(t, e) {
    var i = !r && !t
    if (((e = e || {}), (s && !e.skipTest) || !o)) return !1
    'string' == typeof (t = t || 'img')
      ? (t = document.querySelectorAll(t))
      : 'length' in t || (t = [t])
    for (var n = 0; n < t.length; n++)
      (t[n][a] = t[n][a] || { skipTest: e.skipTest }), A(t[n])
    i &&
      (document.body.addEventListener(
        'load',
        function (t) {
          'IMG' === t.target.tagName && f(t.target, { skipTest: e.skipTest })
        },
        !0
      ),
      (r = !0),
      (t = 'img')),
      e.watchMQ &&
        window.addEventListener(
          'resize',
          f.bind(null, t, { skipTest: e.skipTest })
        )
  }
  function i(t, e) {
    return t[a] && t[a].img && ('src' === e || 'srcset' === e) ? t[a].img : t
  }
  return (
    (f.supportsObjectFit = c),
    (f.supportsObjectPosition = s) ||
      ((HTMLImageElement.prototype.getAttribute = function (t) {
        return h.call(i(this, t), t)
      }),
      (HTMLImageElement.prototype.setAttribute = function (t, e) {
        return d.call(i(this, t), t, String(e))
      })),
    f
  )
})()
!(function (l, i, n, o) {
  function c(t, e) {
    ;(this.settings = null),
      (this.options = l.extend({}, c.Defaults, e)),
      (this.$element = l(t)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ['busy'],
          animating: ['busy'],
          dragging: ['interacting'],
        },
      }),
      l.each(
        ['onResize', 'onThrottledResize'],
        l.proxy(function (t, e) {
          this._handlers[e] = l.proxy(this[e], this)
        }, this)
      ),
      l.each(
        c.Plugins,
        l.proxy(function (t, e) {
          this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)
      ),
      l.each(
        c.Workers,
        l.proxy(function (t, e) {
          this._pipe.push({ filter: e.filter, run: l.proxy(e.run, this) })
        }, this)
      ),
      this.setup(),
      this.initialize()
  }
  ;(c.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: i,
    fallbackEasing: 'swing',
    info: !1,
    nestedItemSelector: !1,
    itemElement: 'div',
    stageElement: 'div',
    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab',
  }),
    (c.Width = { Default: 'default', Inner: 'inner', Outer: 'outer' }),
    (c.Type = { Event: 'event', State: 'state' }),
    (c.Plugins = {}),
    (c.Workers = [
      {
        filter: ['width', 'settings'],
        run: function () {
          this._width = this.$element.width()
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function (t) {
          t.current = this._items && this._items[this.relative(this._current)]
        },
      },
      {
        filter: ['items', 'settings'],
        run: function () {
          this.$stage.children('.cloned').remove()
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function (t) {
          var e = this.settings.margin || '',
            i = !this.settings.autoWidth,
            n = this.settings.rtl,
            e = {
              width: 'auto',
              'margin-left': n ? e : '',
              'margin-right': n ? '' : e,
            }
          i || this.$stage.children().css(e), (t.css = e)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function (t) {
          var e =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            i = null,
            n = this._items.length,
            s = !this.settings.autoWidth,
            o = []
          for (t.items = { merge: !1, width: e }; n--; )
            (i = this._mergers[n]),
              (i =
                (this.settings.mergeFit && Math.min(i, this.settings.items)) ||
                i),
              (t.items.merge = 1 < i || t.items.merge),
              (o[n] = s ? e * i : this._items[n].width())
          this._widths = o
        },
      },
      {
        filter: ['items', 'settings'],
        run: function () {
          var t = [],
            e = this._items,
            i = this.settings,
            n = Math.max(2 * i.items, 4),
            s = 2 * Math.ceil(e.length / 2),
            o = i.loop && e.length ? (i.rewind ? n : Math.max(n, s)) : 0,
            r = '',
            a = ''
          for (o /= 2; o--; )
            t.push(this.normalize(t.length / 2, !0)),
              (r += e[t[t.length - 1]][0].outerHTML),
              t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)),
              (a = e[t[t.length - 1]][0].outerHTML + a)
          ;(this._clones = t),
            l(r).addClass('cloned').appendTo(this.$stage),
            l(a).addClass('cloned').prependTo(this.$stage)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function () {
          for (
            var t,
              e,
              i = this.settings.rtl ? 1 : -1,
              n = this._clones.length + this._items.length,
              s = -1,
              o = [];
            ++s < n;

          )
            (t = o[s - 1] || 0),
              (e = this._widths[this.relative(s)] + this.settings.margin),
              o.push(t + e * i)
          this._coordinates = o
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function () {
          var t = this.settings.stagePadding,
            e = this._coordinates,
            t = {
              width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
              'padding-left': t || '',
              'padding-right': t || '',
            }
          this.$stage.css(t)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function (t) {
          var e = this._coordinates.length,
            i = !this.settings.autoWidth,
            n = this.$stage.children()
          if (i && t.items.merge)
            for (; e--; )
              (t.css.width = this._widths[this.relative(e)]), n.eq(e).css(t.css)
          else i && ((t.css.width = t.items.width), n.css(t.css))
        },
      },
      {
        filter: ['items'],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr('style')
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function (t) {
          ;(t.current = t.current
            ? this.$stage.children().index(t.current)
            : 0),
            (t.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), t.current)
            )),
            this.reset(t.current)
        },
      },
      {
        filter: ['position'],
        run: function () {
          this.animate(this.coordinates(this._current))
        },
      },
      {
        filter: ['width', 'position', 'items', 'settings'],
        run: function () {
          for (
            var t,
              e,
              i = this.settings.rtl ? 1 : -1,
              n = 2 * this.settings.stagePadding,
              s = this.coordinates(this.current()) + n,
              o = s + this.width() * i,
              r = [],
              a = 0,
              l = this._coordinates.length;
            a < l;
            a++
          )
            (t = this._coordinates[a - 1] || 0),
              (e = Math.abs(this._coordinates[a]) + n * i),
              ((this.op(t, '<=', s) && this.op(t, '>', o)) ||
                (this.op(e, '<', s) && this.op(e, '>', o))) &&
                r.push(a)
          this.$stage.children('.active').removeClass('active'),
            this.$stage
              .children(':eq(' + r.join('), :eq(') + ')')
              .addClass('active'),
            this.settings.center &&
              (this.$stage.children('.center').removeClass('center'),
              this.$stage.children().eq(this.current()).addClass('center'))
        },
      },
    ]),
    (c.prototype.initialize = function () {
      var t, e
      this.enter('initializing'),
        this.trigger('initialize'),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth &&
          !this.is('pre-loading') &&
          ((t = this.$element.find('img')),
          (e = this.settings.nestedItemSelector
            ? '.' + this.settings.nestedItemSelector
            : o),
          (e = this.$element.children(e).width()),
          t.length && e <= 0 && this.preloadAutoWidthImages(t)),
        this.$element.addClass(this.options.loadingClass),
        (this.$stage = l(
          '<' +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(':visible')
          ? this.refresh()
          : this.invalidate('width'),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave('initializing'),
        this.trigger('initialized')
    }),
    (c.prototype.setup = function () {
      var e = this.viewport(),
        t = this.options.responsive,
        i = -1,
        n = null
      t
        ? (l.each(t, function (t) {
            t <= e && i < t && (i = Number(t))
          }),
          'function' ==
            typeof (n = l.extend({}, this.options, t[i])).stagePadding &&
            (n.stagePadding = n.stagePadding()),
          delete n.responsive,
          n.responsiveClass &&
            this.$element.attr(
              'class',
              this.$element
                .attr('class')
                .replace(
                  new RegExp(
                    '(' + this.options.responsiveClass + '-)\\S+\\s',
                    'g'
                  ),
                  '$1' + i
                )
            ))
        : (n = l.extend({}, this.options)),
        this.trigger('change', { property: { name: 'settings', value: n } }),
        (this._breakpoint = i),
        (this.settings = n),
        this.invalidate('settings'),
        this.trigger('changed', {
          property: { name: 'settings', value: this.settings },
        })
    }),
    (c.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1))
    }),
    (c.prototype.prepare = function (t) {
      var e = this.trigger('prepare', { content: t })
      return (
        e.data ||
          (e.data = l('<' + this.settings.itemElement + '/>')
            .addClass(this.options.itemClass)
            .append(t)),
        this.trigger('prepared', { content: e.data }),
        e.data
      )
    }),
    (c.prototype.update = function () {
      for (
        var t = 0,
          e = this._pipe.length,
          i = l.proxy(function (t) {
            return this[t]
          }, this._invalidated),
          n = {};
        t < e;

      )
        (this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) &&
          this._pipe[t].run(n),
          t++
      ;(this._invalidated = {}), this.is('valid') || this.enter('valid')
    }),
    (c.prototype.width = function (t) {
      switch ((t = t || c.Width.Default)) {
        case c.Width.Inner:
        case c.Width.Outer:
          return this._width
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          )
      }
    }),
    (c.prototype.refresh = function () {
      this.enter('refreshing'),
        this.trigger('refresh'),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave('refreshing'),
        this.trigger('refreshed')
    }),
    (c.prototype.onThrottledResize = function () {
      i.clearTimeout(this.resizeTimer),
        (this.resizeTimer = i.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ))
    }),
    (c.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(':visible') &&
        (this.enter('resizing'),
        this.trigger('resize').isDefaultPrevented()
          ? (this.leave('resizing'), !1)
          : (this.invalidate('width'),
            this.refresh(),
            this.leave('resizing'),
            void this.trigger('resized')))
      )
    }),
    (c.prototype.registerEventHandlers = function () {
      l.support.transition &&
        this.$stage.on(
          l.support.transition.end + '.owl.core',
          l.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(i, 'resize', this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on('mousedown.owl.core', l.proxy(this.onDragStart, this)),
          this.$stage.on(
            'dragstart.owl.core selectstart.owl.core',
            function () {
              return !1
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            'touchstart.owl.core',
            l.proxy(this.onDragStart, this)
          ),
          this.$stage.on('touchcancel.owl.core', l.proxy(this.onDragEnd, this)))
    }),
    (c.prototype.onDragStart = function (t) {
      var e = null
      3 !== t.which &&
        ((e = l.support.transform
          ? {
              x: (e = this.$stage
                .css('transform')
                .replace(/.*\(|\)| /g, '')
                .split(','))[16 === e.length ? 12 : 4],
              y: e[16 === e.length ? 13 : 5],
            }
          : ((e = this.$stage.position()),
            {
              x: this.settings.rtl
                ? e.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : e.left,
              y: e.top,
            })),
        this.is('animating') &&
          (l.support.transform ? this.animate(e.x) : this.$stage.stop(),
          this.invalidate('position')),
        this.$element.toggleClass(
          this.options.grabClass,
          'mousedown' === t.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = l(t.target)),
        (this._drag.stage.start = e),
        (this._drag.stage.current = e),
        (this._drag.pointer = this.pointer(t)),
        l(n).on(
          'mouseup.owl.core touchend.owl.core',
          l.proxy(this.onDragEnd, this)
        ),
        l(n).one(
          'mousemove.owl.core touchmove.owl.core',
          l.proxy(function (t) {
            var e = this.difference(this._drag.pointer, this.pointer(t))
            l(n).on(
              'mousemove.owl.core touchmove.owl.core',
              l.proxy(this.onDragMove, this)
            ),
              (Math.abs(e.x) < Math.abs(e.y) && this.is('valid')) ||
                (t.preventDefault(),
                this.enter('dragging'),
                this.trigger('drag'))
          }, this)
        ))
    }),
    (c.prototype.onDragMove = function (t) {
      var e,
        i = null,
        n = null,
        s = this.difference(this._drag.pointer, this.pointer(t)),
        o = this.difference(this._drag.stage.start, s)
      this.is('dragging') &&
        (t.preventDefault(),
        this.settings.loop
          ? ((i = this.coordinates(this.minimum())),
            (n = this.coordinates(this.maximum() + 1) - i),
            (o.x = ((((o.x - i) % n) + n) % n) + i))
          : ((i = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (n = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (e = this.settings.pullDrag ? (-1 * s.x) / 5 : 0),
            (o.x = Math.max(Math.min(o.x, i + e), n + e))),
        (this._drag.stage.current = o),
        this.animate(o.x))
    }),
    (c.prototype.onDragEnd = function (t) {
      var e = this.difference(this._drag.pointer, this.pointer(t)),
        i = this._drag.stage.current,
        t = (0 < e.x) ^ this.settings.rtl ? 'left' : 'right'
      l(n).off('.owl.core'),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== e.x && this.is('dragging')) || !this.is('valid')) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(i.x, 0 !== e.x ? t : this._drag.direction)),
          this.invalidate('position'),
          this.update(),
          (this._drag.direction = t),
          (3 < Math.abs(e.x) || 300 < new Date().getTime() - this._drag.time) &&
            this._drag.target.one('click.owl.core', function () {
              return !1
            })),
        this.is('dragging') && (this.leave('dragging'), this.trigger('dragged'))
    }),
    (c.prototype.closest = function (i, n) {
      var s = -1,
        o = this.width(),
        r = this.coordinates()
      return (
        this.settings.freeDrag ||
          l.each(
            r,
            l.proxy(function (t, e) {
              return (
                'left' === n && e - 30 < i && i < e + 30
                  ? (s = t)
                  : 'right' === n && e - o - 30 < i && i < e - o + 30
                  ? (s = t + 1)
                  : this.op(i, '<', e) &&
                    this.op(i, '>', r[t + 1] || e - o) &&
                    (s = 'left' === n ? t + 1 : t),
                -1 === s
              )
            }, this)
          ),
        this.settings.loop ||
          (this.op(i, '>', r[this.minimum()])
            ? (s = i = this.minimum())
            : this.op(i, '<', r[this.maximum()]) && (s = i = this.maximum())),
        s
      )
    }),
    (c.prototype.animate = function (t) {
      var e = 0 < this.speed()
      this.is('animating') && this.onTransitionEnd(),
        e && (this.enter('animating'), this.trigger('translate')),
        l.support.transform3d && l.support.transition
          ? this.$stage.css({
              transform: 'translate3d(' + t + 'px,0px,0px)',
              transition: this.speed() / 1e3 + 's',
            })
          : e
          ? this.$stage.animate(
              { left: t + 'px' },
              this.speed(),
              this.settings.fallbackEasing,
              l.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: t + 'px' })
    }),
    (c.prototype.is = function (t) {
      return this._states.current[t] && 0 < this._states.current[t]
    }),
    (c.prototype.current = function (t) {
      return t === o
        ? this._current
        : 0 === this._items.length
        ? o
        : ((t = this.normalize(t)),
          this._current !== t &&
            ((e = this.trigger('change', {
              property: { name: 'position', value: t },
            })).data !== o && (t = this.normalize(e.data)),
            (this._current = t),
            this.invalidate('position'),
            this.trigger('changed', {
              property: { name: 'position', value: this._current },
            })),
          this._current)
      var e
    }),
    (c.prototype.invalidate = function (t) {
      return (
        'string' === l.type(t) &&
          ((this._invalidated[t] = !0),
          this.is('valid') && this.leave('valid')),
        l.map(this._invalidated, function (t, e) {
          return e
        })
      )
    }),
    (c.prototype.reset = function (t) {
      ;(t = this.normalize(t)) !== o &&
        ((this._speed = 0),
        (this._current = t),
        this.suppress(['translate', 'translated']),
        this.animate(this.coordinates(t)),
        this.release(['translate', 'translated']))
    }),
    (c.prototype.normalize = function (t, e) {
      var i = this._items.length,
        e = e ? 0 : this._clones.length
      return (
        !this.isNumeric(t) || i < 1
          ? (t = o)
          : (t < 0 || i + e <= t) &&
            (t = ((((t - e / 2) % i) + i) % i) + e / 2),
        t
      )
    }),
    (c.prototype.relative = function (t) {
      return (t -= this._clones.length / 2), this.normalize(t, !0)
    }),
    (c.prototype.maximum = function (t) {
      var e,
        i,
        n,
        s = this.settings,
        o = this._coordinates.length
      if (s.loop) o = this._clones.length / 2 + this._items.length - 1
      else if (s.autoWidth || s.merge) {
        for (
          e = this._items.length,
            i = this._items[--e].width(),
            n = this.$element.width();
          e-- && !(n < (i += this._items[e].width() + this.settings.margin));

        );
        o = e + 1
      } else
        o = s.center ? this._items.length - 1 : this._items.length - s.items
      return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }),
    (c.prototype.minimum = function (t) {
      return t ? 0 : this._clones.length / 2
    }),
    (c.prototype.items = function (t) {
      return t === o
        ? this._items.slice()
        : ((t = this.normalize(t, !0)), this._items[t])
    }),
    (c.prototype.mergers = function (t) {
      return t === o
        ? this._mergers.slice()
        : ((t = this.normalize(t, !0)), this._mergers[t])
    }),
    (c.prototype.clones = function (i) {
      function n(t) {
        return t % 2 == 0 ? s + t / 2 : e - (t + 1) / 2
      }
      var e = this._clones.length / 2,
        s = e + this._items.length
      return i === o
        ? l.map(this._clones, function (t, e) {
            return n(e)
          })
        : l.map(this._clones, function (t, e) {
            return t === i ? n(e) : null
          })
    }),
    (c.prototype.speed = function (t) {
      return t !== o && (this._speed = t), this._speed
    }),
    (c.prototype.coordinates = function (t) {
      var e,
        i = 1,
        n = t - 1
      return t === o
        ? l.map(
            this._coordinates,
            l.proxy(function (t, e) {
              return this.coordinates(e)
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((i = -1), (n = t + 1)),
              (e = this._coordinates[t]),
              (e += ((this.width() - e + (this._coordinates[n] || 0)) / 2) * i))
            : (e = this._coordinates[n] || 0),
          (e = Math.ceil(e)))
    }),
    (c.prototype.duration = function (t, e, i) {
      return 0 === i
        ? 0
        : Math.min(Math.max(Math.abs(e - t), 1), 6) *
            Math.abs(i || this.settings.smartSpeed)
    }),
    (c.prototype.to = function (t, e) {
      var i,
        n = this.current(),
        s = t - this.relative(n),
        o = (0 < s) - (s < 0),
        r = this._items.length,
        a = this.minimum(),
        l = this.maximum()
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(s) > r / 2 && (s += -1 * o * r),
          (i = (((((t = n + s) - a) % r) + r) % r) + a) !== t &&
            i - s <= l &&
            0 < i - s &&
            this.reset((n = (t = i) - s)))
        : (t = this.settings.rewind
            ? ((t % (l += 1)) + l) % l
            : Math.max(a, Math.min(l, t))),
        this.speed(this.duration(n, t, e)),
        this.current(t),
        this.$element.is(':visible') && this.update()
    }),
    (c.prototype.next = function (t) {
      ;(t = t || !1), this.to(this.relative(this.current()) + 1, t)
    }),
    (c.prototype.prev = function (t) {
      ;(t = t || !1), this.to(this.relative(this.current()) - 1, t)
    }),
    (c.prototype.onTransitionEnd = function (t) {
      if (
        t !== o &&
        (t.stopPropagation(),
        (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))
      )
        return !1
      this.leave('animating'), this.trigger('translated')
    }),
    (c.prototype.viewport = function () {
      var t
      return (
        this.options.responsiveBaseElement !== i
          ? (t = l(this.options.responsiveBaseElement).width())
          : i.innerWidth
          ? (t = i.innerWidth)
          : n.documentElement && n.documentElement.clientWidth
          ? (t = n.documentElement.clientWidth)
          : console.warn('Can not detect viewport width.'),
        t
      )
    }),
    (c.prototype.replace = function (t) {
      this.$stage.empty(),
        (this._items = []),
        (t = t && (t instanceof jQuery ? t : l(t))),
        (t = this.settings.nestedItemSelector
          ? t.find('.' + this.settings.nestedItemSelector)
          : t)
          .filter(function () {
            return 1 === this.nodeType
          })
          .each(
            l.proxy(function (t, e) {
              ;(e = this.prepare(e)),
                this.$stage.append(e),
                this._items.push(e),
                this._mergers.push(
                  +e
                    .find('[data-merge]')
                    .addBack('[data-merge]')
                    .attr('data-merge') || 1
                )
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate('items')
    }),
    (c.prototype.add = function (t, e) {
      var i = this.relative(this._current)
      ;(e = e === o ? this._items.length : this.normalize(e, !0)),
        (t = t instanceof jQuery ? t : l(t)),
        this.trigger('add', { content: t, position: e }),
        (t = this.prepare(t)),
        0 === this._items.length || e === this._items.length
          ? (0 === this._items.length && this.$stage.append(t),
            0 !== this._items.length && this._items[e - 1].after(t),
            this._items.push(t),
            this._mergers.push(
              +t
                .find('[data-merge]')
                .addBack('[data-merge]')
                .attr('data-merge') || 1
            ))
          : (this._items[e].before(t),
            this._items.splice(e, 0, t),
            this._mergers.splice(
              e,
              0,
              +t
                .find('[data-merge]')
                .addBack('[data-merge]')
                .attr('data-merge') || 1
            )),
        this._items[i] && this.reset(this._items[i].index()),
        this.invalidate('items'),
        this.trigger('added', { content: t, position: e })
    }),
    (c.prototype.remove = function (t) {
      ;(t = this.normalize(t, !0)) !== o &&
        (this.trigger('remove', { content: this._items[t], position: t }),
        this._items[t].remove(),
        this._items.splice(t, 1),
        this._mergers.splice(t, 1),
        this.invalidate('items'),
        this.trigger('removed', { content: null, position: t }))
    }),
    (c.prototype.preloadAutoWidthImages = function (t) {
      t.each(
        l.proxy(function (t, e) {
          this.enter('pre-loading'),
            (e = l(e)),
            l(new Image())
              .one(
                'load',
                l.proxy(function (t) {
                  e.attr('src', t.target.src),
                    e.css('opacity', 1),
                    this.leave('pre-loading'),
                    this.is('pre-loading') ||
                      this.is('initializing') ||
                      this.refresh()
                }, this)
              )
              .attr(
                'src',
                e.attr('src') || e.attr('data-src') || e.attr('data-src-retina')
              )
        }, this)
      )
    }),
    (c.prototype.destroy = function () {
      for (var t in (this.$element.off('.owl.core'),
      this.$stage.off('.owl.core'),
      l(n).off('.owl.core'),
      !1 !== this.settings.responsive &&
        (i.clearTimeout(this.resizeTimer),
        this.off(i, 'resize', this._handlers.onThrottledResize)),
      this._plugins))
        this._plugins[t].destroy()
      this.$stage.children('.cloned').remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            'class',
            this.$element
              .attr('class')
              .replace(
                new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'),
                ''
              )
          )
          .removeData('owl.carousel')
    }),
    (c.prototype.op = function (t, e, i) {
      var n = this.settings.rtl
      switch (e) {
        case '<':
          return n ? i < t : t < i
        case '>':
          return n ? t < i : i < t
        case '>=':
          return n ? t <= i : i <= t
        case '<=':
          return n ? i <= t : t <= i
      }
    }),
    (c.prototype.on = function (t, e, i, n) {
      t.addEventListener
        ? t.addEventListener(e, i, n)
        : t.attachEvent && t.attachEvent('on' + e, i)
    }),
    (c.prototype.off = function (t, e, i, n) {
      t.removeEventListener
        ? t.removeEventListener(e, i, n)
        : t.detachEvent && t.detachEvent('on' + e, i)
    }),
    (c.prototype.trigger = function (t, e, i, n, s) {
      var o = { item: { count: this._items.length, index: this.current() } },
        r = l.camelCase(
          l
            .grep(['on', t, i], function (t) {
              return t
            })
            .join('-')
            .toLowerCase()
        ),
        a = l.Event(
          [t, 'owl', i || 'carousel'].join('.').toLowerCase(),
          l.extend({ relatedTarget: this }, o, e)
        )
      return (
        this._supress[t] ||
          (l.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(a)
          }),
          this.register({ type: c.Type.Event, name: t }),
          this.$element.trigger(a),
          this.settings &&
            'function' == typeof this.settings[r] &&
            this.settings[r].call(this, a)),
        a
      )
    }),
    (c.prototype.enter = function (t) {
      l.each(
        [t].concat(this._states.tags[t] || []),
        l.proxy(function (t, e) {
          this._states.current[e] === o && (this._states.current[e] = 0),
            this._states.current[e]++
        }, this)
      )
    }),
    (c.prototype.leave = function (t) {
      l.each(
        [t].concat(this._states.tags[t] || []),
        l.proxy(function (t, e) {
          this._states.current[e]--
        }, this)
      )
    }),
    (c.prototype.register = function (i) {
      var e
      i.type === c.Type.Event
        ? (l.event.special[i.name] || (l.event.special[i.name] = {}),
          l.event.special[i.name].owl ||
            ((e = l.event.special[i.name]._default),
            (l.event.special[i.name]._default = function (t) {
              return !e ||
                !e.apply ||
                (t.namespace && -1 !== t.namespace.indexOf('owl'))
                ? t.namespace && -1 < t.namespace.indexOf('owl')
                : e.apply(this, arguments)
            }),
            (l.event.special[i.name].owl = !0)))
        : i.type === c.Type.State &&
          (this._states.tags[i.name]
            ? (this._states.tags[i.name] = this._states.tags[i.name].concat(
                i.tags
              ))
            : (this._states.tags[i.name] = i.tags),
          (this._states.tags[i.name] = l.grep(
            this._states.tags[i.name],
            l.proxy(function (t, e) {
              return l.inArray(t, this._states.tags[i.name]) === e
            }, this)
          )))
    }),
    (c.prototype.suppress = function (t) {
      l.each(
        t,
        l.proxy(function (t, e) {
          this._supress[e] = !0
        }, this)
      )
    }),
    (c.prototype.release = function (t) {
      l.each(
        t,
        l.proxy(function (t, e) {
          delete this._supress[e]
        }, this)
      )
    }),
    (c.prototype.pointer = function (t) {
      var e = { x: null, y: null }
      return (
        (t =
          (t = t.originalEvent || t || i.event).touches && t.touches.length
            ? t.touches[0]
            : t.changedTouches && t.changedTouches.length
            ? t.changedTouches[0]
            : t).pageX
          ? ((e.x = t.pageX), (e.y = t.pageY))
          : ((e.x = t.clientX), (e.y = t.clientY)),
        e
      )
    }),
    (c.prototype.isNumeric = function (t) {
      return !isNaN(parseFloat(t))
    }),
    (c.prototype.difference = function (t, e) {
      return { x: t.x - e.x, y: t.y - e.y }
    }),
    (l.fn.owlCarousel = function (e) {
      var n = Array.prototype.slice.call(arguments, 1)
      return this.each(function () {
        var t = l(this),
          i = t.data('owl.carousel')
        i ||
          ((i = new c(this, 'object' == typeof e && e)),
          t.data('owl.carousel', i),
          l.each(
            [
              'next',
              'prev',
              'to',
              'destroy',
              'refresh',
              'replace',
              'add',
              'remove',
            ],
            function (t, e) {
              i.register({ type: c.Type.Event, name: e }),
                i.$element.on(
                  e + '.owl.carousel.core',
                  l.proxy(function (t) {
                    t.namespace &&
                      t.relatedTarget !== this &&
                      (this.suppress([e]),
                      i[e].apply(this, [].slice.call(arguments, 1)),
                      this.release([e]))
                  }, i)
                )
            }
          )),
          'string' == typeof e && '_' !== e.charAt(0) && i[e].apply(i, n)
      })
    }),
    (l.fn.owlCarousel.Constructor = c)
})(window.Zepto || window.jQuery, window, document),
  (function (e, i) {
    function n(t) {
      ;(this._core = t),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          'initialized.owl.carousel': e.proxy(function (t) {
            t.namespace && this._core.settings.autoRefresh && this.watch()
          }, this),
        }),
        (this._core.options = e.extend({}, n.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (n.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(':visible')),
          (this._interval = i.setInterval(
            e.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )))
      }),
      (n.prototype.refresh = function () {
        this._core.$element.is(':visible') !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass('owl-hidden', !this._visible),
          this._visible &&
            this._core.invalidate('width') &&
            this._core.refresh())
      }),
      (n.prototype.destroy = function () {
        var t, e
        for (t in (i.clearInterval(this._interval), this._handlers))
          this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, s) {
    function e(t) {
      ;(this._core = t),
        (this._loaded = []),
        (this._handlers = {
          'initialized.owl.carousel change.owl.carousel resized.owl.carousel':
            a.proxy(function (t) {
              if (
                t.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((t.property && 'position' == t.property.name) ||
                  'initialized' == t.type)
              )
                for (
                  var e = this._core.settings,
                    i = (e.center && Math.ceil(e.items / 2)) || e.items,
                    n = (e.center && -1 * i) || 0,
                    s =
                      (t.property && void 0 !== t.property.value
                        ? t.property.value
                        : this._core.current()) + n,
                    o = this._core.clones().length,
                    r = a.proxy(function (t, e) {
                      this.load(e)
                    }, this);
                  n++ < i;

                )
                  this.load(o / 2 + this._core.relative(s)),
                    o && a.each(this._core.clones(this._core.relative(s)), r),
                    s++
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function (t) {
        var e = this._core.$stage.children().eq(t),
          t = e && e.find('.owl-lazy')
        !t ||
          -1 < a.inArray(e.get(0), this._loaded) ||
          (t.each(
            a.proxy(function (t, e) {
              var i = a(e),
                n =
                  (1 < s.devicePixelRatio && i.attr('data-src-retina')) ||
                  i.attr('data-src')
              this._core.trigger('load', { element: i, url: n }, 'lazy'),
                i.is('img')
                  ? i
                      .one(
                        'load.owl.lazy',
                        a.proxy(function () {
                          i.css('opacity', 1),
                            this._core.trigger(
                              'loaded',
                              { element: i, url: n },
                              'lazy'
                            )
                        }, this)
                      )
                      .attr('src', n)
                  : (((e = new Image()).onload = a.proxy(function () {
                      i.css({
                        'background-image': 'url("' + n + '")',
                        opacity: '1',
                      }),
                        this._core.trigger(
                          'loaded',
                          { element: i, url: n },
                          'lazy'
                        )
                    }, this)),
                    (e.src = n))
            }, this)
          ),
          this._loaded.push(e.get(0)))
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (n) {
    function e(t) {
      ;(this._core = t),
        (this._handlers = {
          'initialized.owl.carousel refreshed.owl.carousel': n.proxy(function (
            t
          ) {
            t.namespace && this._core.settings.autoHeight && this.update()
          },
          this),
          'changed.owl.carousel': n.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              'position' == t.property.name &&
              this.update()
          }, this),
          'loaded.owl.lazy': n.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              t.element.closest('.' + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update()
          }, this),
        }),
        (this._core.options = n.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { autoHeight: !1, autoHeightClass: 'owl-height' }),
      (e.prototype.update = function () {
        var t = this._core._current,
          e = t + this._core.settings.items,
          t = this._core.$stage.children().toArray().slice(t, e),
          i = []
        n.each(t, function (t, e) {
          i.push(n(e).height())
        }),
          (e = Math.max.apply(null, i)),
          this._core.$stage
            .parent()
            .height(e)
            .addClass(this._core.settings.autoHeightClass)
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (n.fn.owlCarousel.Constructor.Plugins.AutoHeight = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (u, e) {
    function i(t) {
      ;(this._core = t),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          'initialized.owl.carousel': u.proxy(function (t) {
            t.namespace &&
              this._core.register({
                type: 'state',
                name: 'playing',
                tags: ['interacting'],
              })
          }, this),
          'resize.owl.carousel': u.proxy(function (t) {
            t.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              t.preventDefault()
          }, this),
          'refreshed.owl.carousel': u.proxy(function (t) {
            t.namespace &&
              this._core.is('resizing') &&
              this._core.$stage.find('.cloned .owl-video-frame').remove()
          }, this),
          'changed.owl.carousel': u.proxy(function (t) {
            t.namespace &&
              'position' === t.property.name &&
              this._playing &&
              this.stop()
          }, this),
          'prepared.owl.carousel': u.proxy(function (t) {
            var e
            !t.namespace ||
              ((e = u(t.content).find('.owl-video')).length &&
                (e.css('display', 'none'), this.fetch(e, u(t.content))))
          }, this),
        }),
        (this._core.options = u.extend({}, i.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          'click.owl.video',
          '.owl-video-play-icon',
          u.proxy(function (t) {
            this.play(t)
          }, this)
        )
    }
    ;(i.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (i.prototype.fetch = function (t, e) {
        var i = t.attr('data-vimeo-id')
            ? 'vimeo'
            : t.attr('data-vzaar-id')
            ? 'vzaar'
            : 'youtube',
          n =
            t.attr('data-vimeo-id') ||
            t.attr('data-youtube-id') ||
            t.attr('data-vzaar-id'),
          s = t.attr('data-width') || this._core.settings.videoWidth,
          o = t.attr('data-height') || this._core.settings.videoHeight,
          r = t.attr('href')
        if (!r) throw new Error('Missing video URL.')
        if (
          -1 <
          (n = r.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          ))[3].indexOf('youtu')
        )
          i = 'youtube'
        else if (-1 < n[3].indexOf('vimeo')) i = 'vimeo'
        else {
          if (!(-1 < n[3].indexOf('vzaar')))
            throw new Error('Video URL not supported.')
          i = 'vzaar'
        }
        ;(n = n[6]),
          (this._videos[r] = { type: i, id: n, width: s, height: o }),
          e.attr('data-video', r),
          this.thumbnail(t, this._videos[r])
      }),
      (i.prototype.thumbnail = function (e, t) {
        function i(t) {
          ;(n = c.lazyLoad
            ? '<div class="owl-video-tn ' + l + '" ' + a + '="' + t + '"></div>'
            : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
              t +
              ')"></div>'),
            e.after(n),
            e.after('<div class="owl-video-play-icon"></div>')
        }
        var n,
          s,
          o =
            t.width && t.height
              ? 'style="width:' + t.width + 'px;height:' + t.height + 'px;"'
              : '',
          r = e.find('img'),
          a = 'src',
          l = '',
          c = this._core.settings
        if (
          (e.wrap('<div class="owl-video-wrapper"' + o + '></div>'),
          this._core.settings.lazyLoad && ((a = 'data-src'), (l = 'owl-lazy')),
          r.length)
        )
          return i(r.attr(a)), r.remove(), !1
        'youtube' === t.type
          ? ((s = '//img.youtube.com/vi/' + t.id + '/hqdefault.jpg'), i(s))
          : 'vimeo' === t.type
          ? u.ajax({
              type: 'GET',
              url: '//vimeo.com/api/v2/video/' + t.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function (t) {
                ;(s = t[0].thumbnail_large), i(s)
              },
            })
          : 'vzaar' === t.type &&
            u.ajax({
              type: 'GET',
              url: '//vzaar.com/api/videos/' + t.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function (t) {
                ;(s = t.framegrab_url), i(s)
              },
            })
      }),
      (i.prototype.stop = function () {
        this._core.trigger('stop', null, 'video'),
          this._playing.find('.owl-video-frame').remove(),
          this._playing.removeClass('owl-video-playing'),
          (this._playing = null),
          this._core.leave('playing'),
          this._core.trigger('stopped', null, 'video')
      }),
      (i.prototype.play = function (t) {
        var e,
          i = u(t.target).closest('.' + this._core.settings.itemClass),
          n = this._videos[i.attr('data-video')],
          s = n.width || '100%',
          t = n.height || this._core.$stage.height()
        this._playing ||
          (this._core.enter('playing'),
          this._core.trigger('play', null, 'video'),
          (i = this._core.items(this._core.relative(i.index()))),
          this._core.reset(i.index()),
          'youtube' === n.type
            ? (e =
                '<iframe width="' +
                s +
                '" height="' +
                t +
                '" src="//www.youtube.com/embed/' +
                n.id +
                '?autoplay=1&rel=0&v=' +
                n.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : 'vimeo' === n.type
            ? (e =
                '<iframe src="//player.vimeo.com/video/' +
                n.id +
                '?autoplay=1" width="' +
                s +
                '" height="' +
                t +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : 'vzaar' === n.type &&
              (e =
                '<iframe frameborder="0"height="' +
                t +
                '"width="' +
                s +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                n.id +
                '/player?autoplay=true"></iframe>'),
          u('<div class="owl-video-frame">' + e + '</div>').insertAfter(
            i.find('.owl-video')
          ),
          (this._playing = i.addClass('owl-video-playing')))
      }),
      (i.prototype.isInFullScreen = function () {
        var t =
          e.fullscreenElement ||
          e.mozFullScreenElement ||
          e.webkitFullscreenElement
        return t && u(t).parent().hasClass('owl-video-frame')
      }),
      (i.prototype.destroy = function () {
        var t, e
        for (t in (this._core.$element.off('click.owl.video'), this._handlers))
          this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (u.fn.owlCarousel.Constructor.Plugins.Video = i)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (r) {
    function e(t) {
      ;(this.core = t),
        (this.core.options = r.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = void 0),
        (this.next = void 0),
        (this.handlers = {
          'change.owl.carousel': r.proxy(function (t) {
            t.namespace &&
              'position' == t.property.name &&
              ((this.previous = this.core.current()),
              (this.next = t.property.value))
          }, this),
          'drag.owl.carousel dragged.owl.carousel translated.owl.carousel':
            r.proxy(function (t) {
              t.namespace && (this.swapping = 'translated' == t.type)
            }, this),
          'translate.owl.carousel': r.proxy(function (t) {
            t.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap()
          }, this),
        }),
        this.core.$element.on(this.handlers)
    }
    ;(e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        var t, e, i, n, s, o
        1 === this.core.settings.items &&
          r.support.animation &&
          r.support.transition &&
          (this.core.speed(0),
          (e = r.proxy(this.clear, this)),
          (i = this.core.$stage.children().eq(this.previous)),
          (n = this.core.$stage.children().eq(this.next)),
          (s = this.core.settings.animateIn),
          (o = this.core.settings.animateOut),
          this.core.current() !== this.previous &&
            (o &&
              ((t =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              i
                .one(r.support.animation.end, e)
                .css({ left: t + 'px' })
                .addClass('animated owl-animated-out')
                .addClass(o)),
            s &&
              n
                .one(r.support.animation.end, e)
                .addClass('animated owl-animated-in')
                .addClass(s)))
      }),
      (e.prototype.clear = function (t) {
        r(t.target)
          .css({ left: '' })
          .removeClass('animated owl-animated-out owl-animated-in')
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd()
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (r.fn.owlCarousel.Constructor.Plugins.Animate = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (i, n, s) {
    function e(t) {
      ;(this._core = t),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          'changed.owl.carousel': i.proxy(function (t) {
            t.namespace && 'settings' === t.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : t.namespace &&
                'position' === t.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval()
          }, this),
          'initialized.owl.carousel': i.proxy(function (t) {
            t.namespace && this._core.settings.autoplay && this.play()
          }, this),
          'play.owl.autoplay': i.proxy(function (t, e, i) {
            t.namespace && this.play(e, i)
          }, this),
          'stop.owl.autoplay': i.proxy(function (t) {
            t.namespace && this.stop()
          }, this),
          'mouseover.owl.autoplay': i.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause()
          }, this),
          'mouseleave.owl.autoplay': i.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.play()
          }, this),
          'touchstart.owl.core': i.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause()
          }, this),
          'touchend.owl.core': i.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play()
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = i.extend({}, e.Defaults, this._core.options))
    }
    ;(e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype.play = function (t, e) {
        ;(this._paused = !1),
          this._core.is('rotating') ||
            (this._core.enter('rotating'), this._setAutoPlayInterval())
      }),
      (e.prototype._getNextTimeout = function (t, e) {
        return (
          this._timeout && n.clearTimeout(this._timeout),
          n.setTimeout(
            i.proxy(function () {
              this._paused ||
                this._core.is('busy') ||
                this._core.is('interacting') ||
                s.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed)
            }, this),
            t || this._core.settings.autoplayTimeout
          )
        )
      }),
      (e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
      }),
      (e.prototype.stop = function () {
        this._core.is('rotating') &&
          (n.clearTimeout(this._timeout), this._core.leave('rotating'))
      }),
      (e.prototype.pause = function () {
        this._core.is('rotating') && (this._paused = !0)
      }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in (this.stop(), this._handlers))
          this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (i.fn.owlCarousel.Constructor.Plugins.autoplay = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (s) {
    'use strict'
    function e(t) {
      ;(this._core = t),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          'prepared.owl.carousel': s.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  s(t.content)
                    .find('[data-dot]')
                    .addBack('[data-dot]')
                    .attr('data-dot') +
                  '</div>'
              )
          }, this),
          'added.owl.carousel': s.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 0, this._templates.pop())
          }, this),
          'remove.owl.carousel': s.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 1)
          }, this),
          'changed.owl.carousel': s.proxy(function (t) {
            t.namespace && 'position' == t.property.name && this.draw()
          }, this),
          'initialized.owl.carousel': s.proxy(function (t) {
            t.namespace &&
              !this._initialized &&
              (this._core.trigger('initialize', null, 'navigation'),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger('initialized', null, 'navigation'))
          }, this),
          'refreshed.owl.carousel': s.proxy(function (t) {
            t.namespace &&
              this._initialized &&
              (this._core.trigger('refresh', null, 'navigation'),
              this.update(),
              this.draw(),
              this._core.trigger('refreshed', null, 'navigation'))
          }, this),
        }),
        (this._core.options = s.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers)
    }
    ;(e.Defaults = {
      nav: !1,
      navText: ['prev', 'next'],
      navSpeed: !1,
      navElement: 'div',
      navContainer: !1,
      navContainerClass: 'owl-nav',
      navClass: ['owl-prev', 'owl-next'],
      slideBy: 1,
      dotClass: 'owl-dot',
      dotsClass: 'owl-dots',
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var t,
          i = this._core.settings
        for (t in ((this._controls.$relative = (
          i.navContainer
            ? s(i.navContainer)
            : s('<div>').addClass(i.navContainerClass).appendTo(this.$element)
        ).addClass('disabled')),
        (this._controls.$previous = s('<' + i.navElement + '>')
          .addClass(i.navClass[0])
          .html(i.navText[0])
          .prependTo(this._controls.$relative)
          .on(
            'click',
            s.proxy(function (t) {
              this.prev(i.navSpeed)
            }, this)
          )),
        (this._controls.$next = s('<' + i.navElement + '>')
          .addClass(i.navClass[1])
          .html(i.navText[1])
          .appendTo(this._controls.$relative)
          .on(
            'click',
            s.proxy(function (t) {
              this.next(i.navSpeed)
            }, this)
          )),
        i.dotsData ||
          (this._templates = [
            s('<div>')
              .addClass(i.dotClass)
              .append(s('<span>'))
              .prop('outerHTML'),
          ]),
        (this._controls.$absolute = (
          i.dotsContainer
            ? s(i.dotsContainer)
            : s('<div>').addClass(i.dotsClass).appendTo(this.$element)
        ).addClass('disabled')),
        this._controls.$absolute.on(
          'click',
          'div',
          s.proxy(function (t) {
            var e = (
              s(t.target).parent().is(this._controls.$absolute)
                ? s(t.target)
                : s(t.target).parent()
            ).index()
            t.preventDefault(), this.to(e, i.dotsSpeed)
          }, this)
        ),
        this._overrides))
          this._core[t] = s.proxy(this[t], this)
      }),
      (e.prototype.destroy = function () {
        var t, e, i, n
        for (t in this._handlers) this.$element.off(t, this._handlers[t])
        for (e in this._controls) this._controls[e].remove()
        for (n in this.overides) this._core[n] = this._overrides[n]
        for (i in Object.getOwnPropertyNames(this))
          'function' != typeof this[i] && (this[i] = null)
      }),
      (e.prototype.update = function () {
        var t,
          e,
          i = this._core.clones().length / 2,
          n = i + this._core.items().length,
          s = this._core.maximum(!0),
          o = this._core.settings,
          r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items
        if (
          ('page' !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)),
          o.dots || 'page' == o.slideBy)
        )
          for (this._pages = [], t = i, e = 0; t < n; t++) {
            if (r <= e || 0 === e) {
              if (
                (this._pages.push({
                  start: Math.min(s, t - i),
                  end: t - i + r - 1,
                }),
                Math.min(s, t - i) === s)
              )
                break
              ;(e = 0), 0
            }
            e += this._core.mergers(this._core.relative(t))
          }
      }),
      (e.prototype.draw = function () {
        var t = this._core.settings,
          e = this._core.items().length <= t.items,
          i = this._core.relative(this._core.current()),
          n = t.loop || t.rewind
        this._controls.$relative.toggleClass('disabled', !t.nav || e),
          t.nav &&
            (this._controls.$previous.toggleClass(
              'disabled',
              !n && i <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              'disabled',
              !n && i >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass('disabled', !t.dots || e),
          t.dots &&
            ((e =
              this._pages.length - this._controls.$absolute.children().length),
            t.dotsData && 0 != e
              ? this._controls.$absolute.html(this._templates.join(''))
              : 0 < e
              ? this._controls.$absolute.append(
                  new Array(1 + e).join(this._templates[0])
                )
              : e < 0 && this._controls.$absolute.children().slice(e).remove(),
            this._controls.$absolute.find('.active').removeClass('active'),
            this._controls.$absolute
              .children()
              .eq(s.inArray(this.current(), this._pages))
              .addClass('active'))
      }),
      (e.prototype.onTrigger = function (t) {
        var e = this._core.settings
        t.page = {
          index: s.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            e &&
            (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items),
        }
      }),
      (e.prototype.current = function () {
        var i = this._core.relative(this._core.current())
        return s
          .grep(
            this._pages,
            s.proxy(function (t, e) {
              return t.start <= i && t.end >= i
            }, this)
          )
          .pop()
      }),
      (e.prototype.getPosition = function (t) {
        var e,
          i,
          n = this._core.settings
        return (
          'page' == n.slideBy
            ? ((e = s.inArray(this.current(), this._pages)),
              (i = this._pages.length),
              t ? ++e : --e,
              (e = this._pages[((e % i) + i) % i].start))
            : ((e = this._core.relative(this._core.current())),
              (i = this._core.items().length),
              t ? (e += n.slideBy) : (e -= n.slideBy)),
          e
        )
      }),
      (e.prototype.next = function (t) {
        s.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
      }),
      (e.prototype.prev = function (t) {
        s.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
      }),
      (e.prototype.to = function (t, e, i) {
        !i && this._pages.length
          ? ((i = this._pages.length),
            s.proxy(this._overrides.to, this._core)(
              this._pages[((t % i) + i) % i].start,
              e
            ))
          : s.proxy(this._overrides.to, this._core)(t, e)
      }),
      (s.fn.owlCarousel.Constructor.Plugins.Navigation = e)
  })(window.Zepto || window.jQuery, (window, document)),
  (function (n, s) {
    'use strict'
    function e(t) {
      ;(this._core = t),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          'initialized.owl.carousel': n.proxy(function (t) {
            t.namespace &&
              'URLHash' === this._core.settings.startPosition &&
              n(s).trigger('hashchange.owl.navigation')
          }, this),
          'prepared.owl.carousel': n.proxy(function (t) {
            var e
            !t.namespace ||
              ((e = n(t.content)
                .find('[data-hash]')
                .addBack('[data-hash]')
                .attr('data-hash')) &&
                (this._hashes[e] = t.content))
          }, this),
          'changed.owl.carousel': n.proxy(function (t) {
            var i
            t.namespace &&
              'position' === t.property.name &&
              ((i = this._core.items(
                this._core.relative(this._core.current())
              )),
              (t = n
                .map(this._hashes, function (t, e) {
                  return t === i ? e : null
                })
                .join()) &&
                s.location.hash.slice(1) !== t &&
                (s.location.hash = t))
          }, this),
        }),
        (this._core.options = n.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        n(s).on(
          'hashchange.owl.navigation',
          n.proxy(function (t) {
            var e = s.location.hash.substring(1),
              i = this._core.$stage.children(),
              e = this._hashes[e] && i.index(this._hashes[e])
            void 0 !== e &&
              e !== this._core.current() &&
              this._core.to(this._core.relative(e), !1, !0)
          }, this)
        )
    }
    ;(e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var t, e
        for (t in (n(s).off('hashchange.owl.navigation'), this._handlers))
          this._core.$element.off(t, this._handlers[t])
        for (e in Object.getOwnPropertyNames(this))
          'function' != typeof this[e] && (this[e] = null)
      }),
      (n.fn.owlCarousel.Constructor.Plugins.Hash = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (s) {
    var o = s('<support>').get(0).style,
      r = 'Webkit Moz O ms'.split(' '),
      t = {
        transition: {
          end: {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd',
            transition: 'transitionend',
          },
        },
        animation: {
          end: {
            WebkitAnimation: 'webkitAnimationEnd',
            MozAnimation: 'animationend',
            OAnimation: 'oAnimationEnd',
            animation: 'animationend',
          },
        },
      },
      e = function () {
        return !!a('transform')
      },
      i = function () {
        return !!a('perspective')
      },
      n = function () {
        return !!a('animation')
      }
    function a(t, i) {
      var n = !1,
        e = t.charAt(0).toUpperCase() + t.slice(1)
      return (
        s.each((t + ' ' + r.join(e + ' ') + e).split(' '), function (t, e) {
          if (void 0 !== o[e]) return (n = !i || e), !1
        }),
        n
      )
    }
    function l(t) {
      return a(t, !0)
    }
    !(function () {
      return !!a('transition')
    })() ||
      ((s.support.transition = new String(l('transition'))),
      (s.support.transition.end = t.transition.end[s.support.transition])),
      n() &&
        ((s.support.animation = new String(l('animation'))),
        (s.support.animation.end = t.animation.end[s.support.animation])),
      e() &&
        ((s.support.transform = new String(l('transform'))),
        (s.support.transform3d = i()))
  })(window.Zepto || window.jQuery, (window, document)),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(e)
      : 'object' == typeof exports
      ? (module.exports = e())
      : (t.PhotoSwipeUI_Default = e())
  })(this, function () {
    'use strict'
    return function (n, a) {
      function t(t) {
        if (k) return !0
        ;(t = t || window.event), E.timeToIdle && E.mouseUsed && !y && r()
        for (
          var e,
            i,
            n = (t.target || t.srcElement).getAttribute('class') || '',
            s = 0;
          s < L.length;
          s++
        )
          (e = L[s]).onTap &&
            -1 < n.indexOf('pswp__' + e.name) &&
            (e.onTap(), (i = !0))
        i &&
          (t.stopPropagation && t.stopPropagation(),
          (k = !0),
          (t = a.features.isOldAndroid ? 600 : 30),
          setTimeout(function () {
            k = !1
          }, t))
      }
      function i() {
        var t = 1 === E.getNumItemsFn()
        t !== T && (F(p, 'ui--one-slide', t), (T = t))
      }
      function e() {
        F(w, 'share-modal--hidden', B)
      }
      function s() {
        return (
          (B = !B)
            ? (a.removeClass(w, 'pswp__share-modal--fade-in'),
              setTimeout(function () {
                B && e()
              }, 300))
            : (e(),
              setTimeout(function () {
                B || a.addClass(w, 'pswp__share-modal--fade-in')
              }, 30)),
          B ||
            (function () {
              for (
                var t = '', e, i, n, s, o, r = 0;
                r < E.shareButtons.length;
                r++
              ) {
                e = E.shareButtons[r]
                n = E.getImageURLForShare(e)
                s = E.getPageURLForShare(e)
                o = E.getTextForShare(e)
                i = e.url
                  .replace('{{url}}', encodeURIComponent(s))
                  .replace('{{image_url}}', encodeURIComponent(n))
                  .replace('{{raw_image_url}}', n)
                  .replace('{{text}}', encodeURIComponent(o))
                t +=
                  '<a href="' +
                  i +
                  '" target="_blank" ' +
                  'class="pswp__share--' +
                  e.id +
                  '"' +
                  (e.download ? 'download' : '') +
                  '>' +
                  e.label +
                  '</a>'
                if (E.parseShareButtonOut) t = E.parseShareButtonOut(e, t)
              }
              ;(w.children[0].innerHTML = t), (w.children[0].onclick = R)
            })(),
          0
        )
      }
      function o(t) {
        for (var e = 0; e < E.closeElClasses.length; e++)
          if (a.hasClass(t, 'pswp__' + E.closeElClasses[e])) return !0
      }
      function r() {
        clearTimeout(S), (O = 0), y && D.setIdle(!1)
      }
      function l(t) {
        ;((t = (t = t || window.event).relatedTarget || t.toElement) &&
          'HTML' !== t.nodeName) ||
          (clearTimeout(S),
          (S = setTimeout(function () {
            D.setIdle(!0)
          }, E.timeToIdleOutside)))
      }
      function c(t) {
        b !== t && (F(x, 'preloader--active', !t), (b = t))
      }
      function u(t) {
        var e,
          i = t.vGap
        !n.likelyTouchDevice || E.mouseUsed || screen.width > E.fitControlsWidth
          ? ((e = E.barsSize),
            E.captionEl && 'auto' === e.bottom
              ? (A ||
                  ((A = a.createEl(
                    'pswp__caption pswp__caption--fake'
                  )).appendChild(a.createEl('pswp__caption__center')),
                  p.insertBefore(A, m),
                  a.addClass(p, 'pswp__ui--fit')),
                E.addCaptionHTMLFn(t, A, !0)
                  ? ((t = A.clientHeight), (i.bottom = parseInt(t, 10) || 44))
                  : (i.bottom = e.top))
              : (i.bottom = 'auto' === e.bottom ? 0 : e.bottom),
            (i.top = e.top))
          : (i.top = i.bottom = 0)
      }
      function h() {
        function t(t) {
          if (t)
            for (var e = t.length, i = 0; i < e; i++) {
              ;(s = t[i]), (o = s.className)
              for (var n = 0; n < L.length; n++)
                (r = L[n]),
                  -1 < o.indexOf('pswp__' + r.name) &&
                    (E[r.option]
                      ? (a.removeClass(s, 'pswp__element--disabled'),
                        r.onInit && r.onInit(s))
                      : a.addClass(s, 'pswp__element--disabled'))
            }
        }
        var s, o, r
        t(p.children)
        var e = a.getChildByClass(p, 'pswp__top-bar')
        e && t(e.children)
      }
      var d,
        p,
        m,
        A,
        f,
        g,
        w,
        v,
        y,
        _,
        x,
        b,
        C,
        T,
        E,
        k,
        I,
        S,
        D = this,
        M = !1,
        z = !0,
        B = !0,
        P = {
          barsSize: { top: 44, bottom: 'auto' },
          closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
          timeToIdle: 4e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          addCaptionHTMLFn: function (t, e) {
            return t.title
              ? ((e.children[0].innerHTML = t.title), !0)
              : ((e.children[0].innerHTML = ''), !1)
          },
          closeEl: !0,
          captionEl: !0,
          fullscreenEl: !0,
          zoomEl: !0,
          shareEl: !0,
          counterEl: !0,
          arrowEl: !0,
          preloaderEl: !0,
          tapToClose: !1,
          tapToToggleControls: !0,
          clickToCloseNonZoomable: !0,
          shareButtons: [
            {
              id: 'facebook',
              label: 'Share on Facebook',
              url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}',
            },
            {
              id: 'twitter',
              label: 'Tweet',
              url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}',
            },
            {
              id: 'pinterest',
              label: 'Pin it',
              url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}',
            },
            {
              id: 'download',
              label: 'Download image',
              url: '{{raw_image_url}}',
              download: !0,
            },
          ],
          getImageURLForShare: function () {
            return n.currItem.src || ''
          },
          getPageURLForShare: function () {
            return window.location.href
          },
          getTextForShare: function () {
            return n.currItem.title || ''
          },
          indexIndicatorSep: ' / ',
          fitControlsWidth: 1200,
        },
        F = function (t, e, i) {
          a[(i ? 'add' : 'remove') + 'Class'](t, 'pswp__' + e)
        },
        R = function (t) {
          var e = (t = t || window.event).target || t.srcElement
          return (
            n.shout('shareLinkClick', t, e),
            !!e.href &&
              (!!e.hasAttribute('download') ||
                (window.open(
                  e.href,
                  'pswp_share',
                  'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=' +
                    (window.screen ? Math.round(screen.width / 2 - 275) : 100)
                ),
                B || s(),
                !1))
          )
        },
        O = 0,
        L = [
          {
            name: 'caption',
            option: 'captionEl',
            onInit: function (t) {
              m = t
            },
          },
          {
            name: 'share-modal',
            option: 'shareEl',
            onInit: function (t) {
              w = t
            },
            onTap: function () {
              s()
            },
          },
          {
            name: 'button--share',
            option: 'shareEl',
            onInit: function (t) {
              g = t
            },
            onTap: function () {
              s()
            },
          },
          {
            name: 'button--zoom',
            option: 'zoomEl',
            onTap: n.toggleDesktopZoom,
          },
          {
            name: 'counter',
            option: 'counterEl',
            onInit: function (t) {
              f = t
            },
          },
          { name: 'button--close', option: 'closeEl', onTap: n.close },
          { name: 'button--arrow--left', option: 'arrowEl', onTap: n.prev },
          { name: 'button--arrow--right', option: 'arrowEl', onTap: n.next },
          {
            name: 'button--fs',
            option: 'fullscreenEl',
            onTap: function () {
              d.isFullscreen() ? d.exit() : d.enter()
            },
          },
          {
            name: 'preloader',
            option: 'preloaderEl',
            onInit: function (t) {
              x = t
            },
          },
        ]
      ;(D.init = function () {
        var e
        a.extend(n.options, P, !0),
          (E = n.options),
          (p = a.getChildByClass(n.scrollWrap, 'pswp__ui')),
          (_ = n.listen)('onVerticalDrag', function (t) {
            z && t < 0.95
              ? D.hideControls()
              : !z && 0.95 <= t && D.showControls()
          }),
          _('onPinchClose', function (t) {
            z && t < 0.9
              ? (D.hideControls(), (e = !0))
              : e && !z && 0.9 < t && D.showControls()
          }),
          _('zoomGestureEnded', function () {
            ;(e = !1) && !z && D.showControls()
          }),
          _('beforeChange', D.update),
          _('doubleTap', function (t) {
            var e = n.currItem.initialZoomLevel
            n.getZoomLevel() !== e
              ? n.zoomTo(e, t, 333)
              : n.zoomTo(E.getDoubleTapZoom(!1, n.currItem), t, 333)
          }),
          _('preventDragEvent', function (t, e, i) {
            var n = t.target || t.srcElement
            n &&
              n.getAttribute('class') &&
              -1 < t.type.indexOf('mouse') &&
              (0 < n.getAttribute('class').indexOf('__caption') ||
                /(SMALL|STRONG|EM)/i.test(n.tagName)) &&
              (i.prevent = !1)
          }),
          _('bindEvents', function () {
            a.bind(p, 'pswpTap click', t),
              a.bind(n.scrollWrap, 'pswpTap', D.onGlobalTap),
              n.likelyTouchDevice ||
                a.bind(n.scrollWrap, 'mouseover', D.onMouseOver)
          }),
          _('unbindEvents', function () {
            B || s(),
              I && clearInterval(I),
              a.unbind(document, 'mouseout', l),
              a.unbind(document, 'mousemove', r),
              a.unbind(p, 'pswpTap click', t),
              a.unbind(n.scrollWrap, 'pswpTap', D.onGlobalTap),
              a.unbind(n.scrollWrap, 'mouseover', D.onMouseOver),
              d &&
                (a.unbind(document, d.eventK, D.updateFullscreen),
                d.isFullscreen() && ((E.hideAnimationDuration = 0), d.exit()),
                (d = null))
          }),
          _('destroy', function () {
            E.captionEl &&
              (A && p.removeChild(A), a.removeClass(m, 'pswp__caption--empty')),
              w && (w.children[0].onclick = null),
              a.removeClass(p, 'pswp__ui--over-close'),
              a.addClass(p, 'pswp__ui--hidden'),
              D.setIdle(!1)
          }),
          E.showAnimationDuration || a.removeClass(p, 'pswp__ui--hidden'),
          _('initialZoomIn', function () {
            E.showAnimationDuration && a.removeClass(p, 'pswp__ui--hidden')
          }),
          _('initialZoomOut', function () {
            a.addClass(p, 'pswp__ui--hidden')
          }),
          _('parseVerticalMargin', u),
          h(),
          E.shareEl && g && w && (B = !0),
          i(),
          E.timeToIdle &&
            _('mouseUsed', function () {
              a.bind(document, 'mousemove', r),
                a.bind(document, 'mouseout', l),
                (I = setInterval(function () {
                  2 === ++O && D.setIdle(!0)
                }, E.timeToIdle / 2))
            }),
          E.fullscreenEl &&
            !a.features.isOldAndroid &&
            ((d = d || D.getFullscreenAPI())
              ? (a.bind(document, d.eventK, D.updateFullscreen),
                D.updateFullscreen(),
                a.addClass(n.template, 'pswp--supports-fs'))
              : a.removeClass(n.template, 'pswp--supports-fs')),
          E.preloaderEl &&
            (c(!0),
            _('beforeChange', function () {
              clearTimeout(C),
                (C = setTimeout(function () {
                  n.currItem && n.currItem.loading
                    ? (n.allowProgressiveImg() &&
                        (!n.currItem.img || n.currItem.img.naturalWidth)) ||
                      c(!1)
                    : c(!0)
                }, E.loadingIndicatorDelay))
            }),
            _('imageLoadComplete', function (t, e) {
              n.currItem === e && c(!0)
            }))
      }),
        (D.setIdle = function (t) {
          F(p, 'ui--idle', (y = t))
        }),
        (D.update = function () {
          ;(M =
            !(!z || !n.currItem) &&
            (D.updateIndexIndicator(),
            E.captionEl &&
              (E.addCaptionHTMLFn(n.currItem, m),
              F(m, 'caption--empty', !n.currItem.title)),
            !0)),
            B || s(),
            i()
        }),
        (D.updateFullscreen = function (t) {
          t &&
            setTimeout(function () {
              n.setScrollOffset(0, a.getScrollY())
            }, 50),
            a[(d.isFullscreen() ? 'add' : 'remove') + 'Class'](
              n.template,
              'pswp--fs'
            )
        }),
        (D.updateIndexIndicator = function () {
          E.counterEl &&
            (f.innerHTML =
              n.getCurrentIndex() + 1 + E.indexIndicatorSep + E.getNumItemsFn())
        }),
        (D.onGlobalTap = function (t) {
          var e = (t = t || window.event).target || t.srcElement
          k ||
            (t.detail && 'mouse' === t.detail.pointerType
              ? o(e)
                ? n.close()
                : a.hasClass(e, 'pswp__img') &&
                  (1 === n.getZoomLevel() &&
                  n.getZoomLevel() <= n.currItem.fitRatio
                    ? E.clickToCloseNonZoomable && n.close()
                    : n.toggleDesktopZoom(t.detail.releasePoint))
              : (E.tapToToggleControls &&
                  (z ? D.hideControls() : D.showControls()),
                E.tapToClose &&
                  (a.hasClass(e, 'pswp__img') || o(e)) &&
                  n.close()))
        }),
        (D.onMouseOver = function (t) {
          t = (t = t || window.event).target || t.srcElement
          F(p, 'ui--over-close', o(t))
        }),
        (D.hideControls = function () {
          a.addClass(p, 'pswp__ui--hidden'), (z = !1)
        }),
        (D.showControls = function () {
          ;(z = !0), M || D.update(), a.removeClass(p, 'pswp__ui--hidden')
        }),
        (D.supportsFullscreen = function () {
          var t = document
          return !!(
            t.exitFullscreen ||
            t.mozCancelFullScreen ||
            t.webkitExitFullscreen ||
            t.msExitFullscreen
          )
        }),
        (D.getFullscreenAPI = function () {
          var t,
            e = document.documentElement,
            i = 'fullscreenchange'
          return (
            e.requestFullscreen
              ? (t = {
                  enterK: 'requestFullscreen',
                  exitK: 'exitFullscreen',
                  elementK: 'fullscreenElement',
                  eventK: i,
                })
              : e.mozRequestFullScreen
              ? (t = {
                  enterK: 'mozRequestFullScreen',
                  exitK: 'mozCancelFullScreen',
                  elementK: 'mozFullScreenElement',
                  eventK: 'moz' + i,
                })
              : e.webkitRequestFullscreen
              ? (t = {
                  enterK: 'webkitRequestFullscreen',
                  exitK: 'webkitExitFullscreen',
                  elementK: 'webkitFullscreenElement',
                  eventK: 'webkit' + i,
                })
              : e.msRequestFullscreen &&
                (t = {
                  enterK: 'msRequestFullscreen',
                  exitK: 'msExitFullscreen',
                  elementK: 'msFullscreenElement',
                  eventK: 'MSFullscreenChange',
                }),
            t &&
              ((t.enter = function () {
                if (
                  ((v = E.closeOnScroll),
                  (E.closeOnScroll = !1),
                  'webkitRequestFullscreen' !== this.enterK)
                )
                  return n.template[this.enterK]()
                n.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
              }),
              (t.exit = function () {
                return (E.closeOnScroll = v), document[this.exitK]()
              }),
              (t.isFullscreen = function () {
                return document[this.elementK]
              })),
            t
          )
        })
    }
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(e)
      : 'object' == typeof exports
      ? (module.exports = e())
      : (t.PhotoSwipe = e())
  })(this, function () {
    'use strict'
    return function (d, i, t, e) {
      var p = {
        features: null,
        bind: function (t, e, i, n) {
          var s = (n ? 'remove' : 'add') + 'EventListener'
          e = e.split(' ')
          for (var o = 0; o < e.length; o++) e[o] && t[s](e[o], i, !1)
        },
        isArray: function (t) {
          return t instanceof Array
        },
        createEl: function (t, e) {
          e = document.createElement(e || 'div')
          return t && (e.className = t), e
        },
        getScrollY: function () {
          var t = window.pageYOffset
          return void 0 !== t ? t : document.documentElement.scrollTop
        },
        unbind: function (t, e, i) {
          p.bind(t, e, i, !0)
        },
        removeClass: function (t, e) {
          e = new RegExp('(\\s|^)' + e + '(\\s|$)')
          t.className = t.className
            .replace(e, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '')
        },
        addClass: function (t, e) {
          p.hasClass(t, e) || (t.className += (t.className ? ' ' : '') + e)
        },
        hasClass: function (t, e) {
          return (
            t.className &&
            new RegExp('(^|\\s)' + e + '(\\s|$)').test(t.className)
          )
        },
        getChildByClass: function (t, e) {
          for (var i = t.firstChild; i; ) {
            if (p.hasClass(i, e)) return i
            i = i.nextSibling
          }
        },
        arraySearch: function (t, e, i) {
          for (var n = t.length; n--; ) if (t[n][i] === e) return n
          return -1
        },
        extend: function (t, e, i) {
          for (var n in e)
            e.hasOwnProperty(n) && ((i && t.hasOwnProperty(n)) || (t[n] = e[n]))
        },
        easing: {
          sine: {
            out: function (t) {
              return Math.sin(t * (Math.PI / 2))
            },
            inOut: function (t) {
              return -(Math.cos(Math.PI * t) - 1) / 2
            },
          },
          cubic: {
            out: function (t) {
              return --t * t * t + 1
            },
          },
        },
        detectFeatures: function () {
          if (p.features) return p.features
          var t,
            e,
            i = p.createEl().style,
            n = '',
            s = {}
          ;(s.oldIE = document.all && !document.addEventListener),
            (s.touch = 'ontouchstart' in window),
            window.requestAnimationFrame &&
              ((s.raf = window.requestAnimationFrame),
              (s.caf = window.cancelAnimationFrame)),
            (s.pointerEvent =
              navigator.pointerEnabled || navigator.msPointerEnabled),
            s.pointerEvent ||
              ((t = navigator.userAgent),
              !/iP(hone|od)/.test(navigator.platform) ||
                ((e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) &&
                  0 < e.length &&
                  1 <= (e = parseInt(e[1], 10)) &&
                  e < 8 &&
                  (s.isOldIOSPhone = !0)),
              (e = (e = t.match(/Android\s([0-9\.]*)/)) ? e[1] : 0),
              1 <= (e = parseFloat(e)) &&
                (e < 4.4 && (s.isOldAndroid = !0), (s.androidVersion = e)),
              (s.isMobileOpera = /opera mini|opera mobi/i.test(t)))
          for (
            var o,
              r,
              a,
              l = ['transform', 'perspective', 'animationName'],
              c = ['', 'webkit', 'Moz', 'ms', 'O'],
              u = 0;
            u < 4;
            u++
          ) {
            for (var n = c[u], h = 0; h < 3; h++)
              (o = l[h]),
                (r = n + (n ? o.charAt(0).toUpperCase() + o.slice(1) : o)),
                !s[o] && r in i && (s[o] = r)
            n &&
              !s.raf &&
              ((n = n.toLowerCase()),
              (s.raf = window[n + 'RequestAnimationFrame']),
              s.raf &&
                (s.caf =
                  window[n + 'CancelAnimationFrame'] ||
                  window[n + 'CancelRequestAnimationFrame']))
          }
          return (
            s.raf ||
              ((a = 0),
              (s.raf = function (t) {
                var e = new Date().getTime(),
                  i = Math.max(0, 16 - (e - a)),
                  n = window.setTimeout(function () {
                    t(e + i)
                  }, i)
                return (a = e + i), n
              }),
              (s.caf = function (t) {
                clearTimeout(t)
              })),
            (s.svg =
              !!document.createElementNS &&
              !!document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                .createSVGRect),
            (p.features = s)
          )
        },
      }
      p.detectFeatures(),
        p.features.oldIE &&
          (p.bind = function (t, e, i, n) {
            e = e.split(' ')
            for (
              var s,
                o = (n ? 'detach' : 'attach') + 'Event',
                r = function () {
                  i.handleEvent.call(i)
                },
                a = 0;
              a < e.length;
              a++
            )
              if ((s = e[a]))
                if ('object' == typeof i && i.handleEvent) {
                  if (n) {
                    if (!i['oldIE' + s]) return !1
                  } else i['oldIE' + s] = r
                  t[o]('on' + s, i['oldIE' + s])
                } else t[o]('on' + s, i)
          })
      var m = this,
        o = 25,
        A = {
          allowPanToNext: !0,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: !1,
          loop: !0,
          pinchToClose: !0,
          closeOnScroll: !0,
          closeOnVerticalDrag: !0,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: !1,
          focus: !0,
          escKey: !0,
          arrowKeys: !0,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          isClickableElement: function (t) {
            return 'A' === t.tagName
          },
          getDoubleTapZoom: function (t, e) {
            return t || e.initialZoomLevel < 0.7 ? 1 : 1.33
          },
          maxSpreadZoom: 1.33,
          modal: !0,
          scaleMode: 'fit',
        }
      p.extend(A, e)
      function n() {
        return { x: 0, y: 0 }
      }
      function s(t, e) {
        p.extend(m, e.publicMethods), Dt.push(t)
      }
      function r(t) {
        var e = Xe()
        return e - 1 < t ? t - e : t < 0 ? e + t : t
      }
      function a(t, e) {
        return Bt[t] || (Bt[t] = []), Bt[t].push(e)
      }
      function l(t, e, i, n) {
        return n === m.currItem.initialZoomLevel
          ? ((i[t] = m.currItem.initialPosition[t]), !0)
          : ((i[t] = Ht(t, n)),
            i[t] > e.min[t]
              ? ((i[t] = e.min[t]), !0)
              : i[t] < e.max[t] && ((i[t] = e.max[t]), !0))
      }
      function c(t) {
        var e = ''
        A.escKey && 27 === t.keyCode
          ? (e = 'close')
          : A.arrowKeys &&
            (37 === t.keyCode
              ? (e = 'prev')
              : 39 === t.keyCode && (e = 'next')),
          e &&
            (t.ctrlKey ||
              t.altKey ||
              t.shiftKey ||
              t.metaKey ||
              (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
              m[e]()))
      }
      function u(t) {
        t && (rt || ot || mt || et) && (t.preventDefault(), t.stopPropagation())
      }
      function h() {
        m.setScrollOffset(0, p.getScrollY())
      }
      function f(t) {
        var e
        ;('mousedown' === t.type && 0 < t.button) ||
          (Ve
            ? t.preventDefault()
            : (it && 'mousedown' === t.type) ||
              (Ee(t, !0) && t.preventDefault(),
              Pt('pointerDown'),
              W &&
                ((e = p.arraySearch(ce, t.pointerId, 'id')) < 0 &&
                  (e = ce.length),
                (ce[e] = { x: t.pageX, y: t.pageY, id: t.pointerId })),
              (t = (e = Pe(t)).length),
              (ct = null),
              te(),
              (nt && 1 !== t) ||
                ((nt = ft = !0),
                p.bind(window, T, m),
                (tt = vt = gt = et = lt = rt = st = ot = !1),
                (At = null),
                Pt('firstTouchStart', e),
                jt(xt, bt),
                (_t.x = _t.y = 0),
                jt(ae, e[0]),
                jt(le, ae),
                (ue.x = kt.x * Tt),
                (he = [{ x: ae.x, y: ae.y }]),
                (K = q = Ft()),
                Gt(I, !0),
                _e(),
                xe()),
              !ut &&
                1 < t &&
                !mt &&
                !lt &&
                ((S = I),
                (ut = st = !(ot = !1)),
                (_t.y = _t.x = 0),
                jt(xt, bt),
                jt(se, e[0]),
                jt(oe, e[1]),
                Ie(se, oe, we),
                (ge.x = Math.abs(we.x) - bt.x),
                (ge.y = Math.abs(we.y) - bt.y),
                (ht = ye(se, oe)))))
      }
      function g(t) {
        var e, i
        t.preventDefault(),
          !W ||
            (-1 < (e = p.arraySearch(ce, t.pointerId, 'id')) &&
              (((i = ce[e]).x = t.pageX), (i.y = t.pageY))),
          nt &&
            ((i = Pe(t)),
            At || rt || ut
              ? (ct = i)
              : fe.x !== kt.x * Tt
              ? (At = 'h')
              : ((t = Math.abs(i[0].x - ae.x) - Math.abs(i[0].y - ae.y)),
                Math.abs(t) >= ne && ((At = 0 < t ? 'h' : 'v'), (ct = i))))
      }
      function w(t) {
        if (Y.isOldAndroid) {
          if (it && 'mouseup' === t.type) return
          ;-1 < t.type.indexOf('touch') &&
            (clearTimeout(it),
            (it = setTimeout(function () {
              it = 0
            }, 600)))
        }
        Pt('pointerUp'),
          Ee(t, !1) && t.preventDefault(),
          !W ||
            (-1 < (i = p.arraySearch(ce, t.pointerId, 'id')) &&
              ((o = ce.splice(i, 1)[0]),
              navigator.pointerEnabled
                ? (o.type = t.pointerType || 'mouse')
                : ((o.type = { 4: 'mouse', 2: 'touch', 3: 'pen' }[
                    t.pointerType
                  ]),
                  o.type || (o.type = t.pointerType || 'mouse'))))
        var e = Pe(t),
          i = e.length
        if (2 === (i = 'mouseup' === t.type ? 0 : i)) return !(ct = null)
        1 === i && jt(le, e[0]),
          0 !== i ||
            At ||
            mt ||
            (o ||
              ('mouseup' === t.type
                ? (o = { x: t.pageX, y: t.pageY, type: 'mouse' })
                : t.changedTouches &&
                  t.changedTouches[0] &&
                  (o = {
                    x: t.changedTouches[0].pageX,
                    y: t.changedTouches[0].pageY,
                    type: 'touch',
                  })),
            Pt('touchRelease', t, o))
        var n,
          s,
          o = -1
        if (
          (0 === i &&
            ((nt = !1),
            p.unbind(window, T, m),
            _e(),
            ut ? (o = 0) : -1 !== Ae && (o = Ft() - Ae)),
          (Ae = 1 === i ? Ft() : -1),
          (o = -1 !== o && o < 150 ? 'zoom' : 'swipe'),
          ut &&
            i < 2 &&
            ((ut = !1),
            1 === i && (o = 'zoomPointerUp'),
            Pt('zoomGestureEnded')),
          (ct = null),
          rt || ot || mt || et)
        )
          if ((te(), (J = J || Oe()).calculateSwipeSpeed('x'), et))
            De() < A.verticalDragRange
              ? m.close()
              : ((n = bt.y),
                (s = wt),
                ee('verticalDrag', 0, 1, 300, p.easing.cubic.out, function (t) {
                  ;(bt.y = (m.currItem.initialPosition.y - n) * t + n),
                    Rt((1 - s) * t + s),
                    Lt()
                }),
                Pt('onVerticalDrag', 1))
          else {
            if ((lt || mt) && 0 === i) {
              if (Ze(o, J)) return
              o = 'zoomPointerUp'
            }
            mt ||
              ('swipe' === o ? !lt && I > m.currItem.fitRatio && Le(J) : We())
          }
      }
      var v,
        y,
        _,
        x,
        b,
        C,
        T,
        E,
        k,
        I,
        S,
        D,
        M,
        z,
        B,
        P,
        F,
        R,
        O,
        L,
        Z,
        $,
        W,
        H,
        j,
        N,
        U,
        Q,
        G,
        V,
        Y,
        X,
        q,
        K,
        J,
        tt,
        et,
        it,
        nt,
        st,
        ot,
        rt,
        at,
        lt,
        ct,
        ut,
        ht,
        dt,
        pt,
        mt,
        At,
        ft,
        gt,
        wt,
        vt,
        yt,
        _t = n(),
        xt = n(),
        bt = n(),
        Ct = {},
        Tt = 0,
        Et = {},
        kt = n(),
        It = 0,
        St = !0,
        Dt = [],
        Mt = {},
        zt = !1,
        Bt = {},
        Pt = function (t) {
          var e = Bt[t]
          if (e) {
            var i = Array.prototype.slice.call(arguments)
            i.shift()
            for (var n = 0; n < e.length; n++) e[n].apply(m, i)
          }
        },
        Ft = function () {
          return new Date().getTime()
        },
        Rt = function (t) {
          ;(wt = t), (m.bg.style.opacity = t * A.bgOpacity)
        },
        Ot = function (t, e, i, n, s) {
          ;(!zt || (s && s !== m.currItem)) &&
            (n /= (s || m.currItem).fitRatio),
            (t[$] = D + e + 'px, ' + i + 'px' + M + ' scale(' + n + ')')
        },
        Lt = function (t) {
          pt &&
            (t &&
              (I > m.currItem.fitRatio
                ? zt || (oi(m.currItem, !1, !0), (zt = !0))
                : zt && (oi(m.currItem), (zt = !1))),
            Ot(pt, bt.x, bt.y, I))
        },
        Zt = function (t) {
          t.container &&
            Ot(
              t.container.style,
              t.initialPosition.x,
              t.initialPosition.y,
              t.initialZoomLevel,
              t
            )
        },
        $t = function (t, e) {
          e[$] = D + t + 'px, 0px' + M
        },
        Wt = function (t, e) {
          var i
          !A.loop &&
            e &&
            ((i = x + (kt.x * Tt - t) / kt.x),
            (e = Math.round(t - fe.x)),
            ((i < 0 && 0 < e) || (i >= Xe() - 1 && e < 0)) &&
              (t = fe.x + e * A.mainScrollEndFriction)),
            (fe.x = t),
            $t(t, b)
        },
        Ht = function (t, e) {
          var i = ge[t] - Et[t]
          return xt[t] + _t[t] + i - (e / S) * i
        },
        jt = function (t, e) {
          ;(t.x = e.x), (t.y = e.y), e.id && (t.id = e.id)
        },
        Nt = function (t) {
          ;(t.x = Math.round(t.x)), (t.y = Math.round(t.y))
        },
        Ut = null,
        Qt = function () {
          Ut &&
            (p.unbind(document, 'mousemove', Qt),
            p.addClass(d, 'pswp--has_mouse'),
            (A.mouseUsed = !0),
            Pt('mouseUsed')),
            (Ut = setTimeout(function () {
              Ut = null
            }, 100))
        },
        Gt = function (t, e) {
          t = ni(m.currItem, Ct, t)
          return e && (dt = t), t
        },
        Vt = function (t) {
          return (t = t || m.currItem).initialZoomLevel
        },
        Yt = function (t) {
          return 0 < (t = t || m.currItem).w ? A.maxSpreadZoom : 1
        },
        Xt = {},
        qt = 0,
        Kt = function (t) {
          Xt[t] && (Xt[t].raf && N(Xt[t].raf), qt--, delete Xt[t])
        },
        Jt = function (t) {
          Xt[t] && Kt(t), Xt[t] || (qt++, (Xt[t] = {}))
        },
        te = function () {
          for (var t in Xt) Xt.hasOwnProperty(t) && Kt(t)
        },
        ee = function (t, e, i, n, s, o, r) {
          var a,
            l = Ft()
          Jt(t)
          function c() {
            if (Xt[t]) {
              if (((a = Ft() - l), n <= a)) return Kt(t), o(i), void (r && r())
              o((i - e) * s(a / n) + e), (Xt[t].raf = j(c))
            }
          }
          c()
        },
        e = {
          shout: Pt,
          listen: a,
          viewportSize: Ct,
          options: A,
          isMainScrollAnimating: function () {
            return mt
          },
          getZoomLevel: function () {
            return I
          },
          getCurrentIndex: function () {
            return x
          },
          isDragging: function () {
            return nt
          },
          isZooming: function () {
            return ut
          },
          setScrollOffset: function (t, e) {
            ;(Et.x = t), (V = Et.y = e), Pt('updateScrollOffset', Et)
          },
          applyZoomPan: function (t, e, i, n) {
            ;(bt.x = e), (bt.y = i), (I = t), Lt(n)
          },
          init: function () {
            if (!v && !y) {
              var t
              ;(m.framework = p),
                (m.template = d),
                (m.bg = p.getChildByClass(d, 'pswp__bg')),
                (U = d.className),
                (v = !0),
                (Y = p.detectFeatures()),
                (j = Y.raf),
                (N = Y.caf),
                ($ = Y.transform),
                (G = Y.oldIE),
                (m.scrollWrap = p.getChildByClass(d, 'pswp__scroll-wrap')),
                (m.container = p.getChildByClass(
                  m.scrollWrap,
                  'pswp__container'
                )),
                (b = m.container.style),
                (m.itemHolders = P =
                  [
                    { el: m.container.children[0], wrap: 0, index: -1 },
                    { el: m.container.children[1], wrap: 0, index: -1 },
                    { el: m.container.children[2], wrap: 0, index: -1 },
                  ]),
                (P[0].el.style.display = P[2].el.style.display = 'none'),
                (function () {
                  if ($) {
                    var t = Y.perspective && !H
                    return (
                      (D = 'translate' + (t ? '3d(' : '(')),
                      (M = Y.perspective ? ', 0px)' : ')')
                    )
                  }
                  ;($ = 'left'),
                    p.addClass(d, 'pswp--ie'),
                    ($t = function (t, e) {
                      e.left = t + 'px'
                    }),
                    (Zt = function (t) {
                      var e = 1 < t.fitRatio ? 1 : t.fitRatio,
                        i = t.container.style,
                        n = e * t.w,
                        e = e * t.h
                      ;(i.width = n + 'px'),
                        (i.height = e + 'px'),
                        (i.left = t.initialPosition.x + 'px'),
                        (i.top = t.initialPosition.y + 'px')
                    }),
                    (Lt = function () {
                      var t, e, i, n
                      pt &&
                        ((t = pt),
                        (i =
                          (e = 1 < (n = m.currItem).fitRatio ? 1 : n.fitRatio) *
                          n.w),
                        (n = e * n.h),
                        (t.width = i + 'px'),
                        (t.height = n + 'px'),
                        (t.left = bt.x + 'px'),
                        (t.top = bt.y + 'px'))
                    })
                })(),
                (k = {
                  resize: m.updateSize,
                  orientationchange: function () {
                    clearTimeout(X),
                      (X = setTimeout(function () {
                        Ct.x !== m.scrollWrap.clientWidth && m.updateSize()
                      }, 500))
                  },
                  scroll: h,
                  keydown: c,
                  click: u,
                })
              var e = Y.isOldIOSPhone || Y.isOldAndroid || Y.isMobileOpera
              for (
                (Y.animationName && Y.transform && !e) ||
                  (A.showAnimationDuration = A.hideAnimationDuration = 0),
                  t = 0;
                t < Dt.length;
                t++
              )
                m['init' + Dt[t]]()
              i && (m.ui = new i(m, p)).init(),
                Pt('firstUpdate'),
                (x = x || A.index || 0),
                (isNaN(x) || x < 0 || x >= Xe()) && (x = 0),
                (m.currItem = Ye(x)),
                (Y.isOldIOSPhone || Y.isOldAndroid) && (St = !1),
                d.setAttribute('aria-hidden', 'false'),
                A.modal &&
                  (St
                    ? (d.style.position = 'fixed')
                    : ((d.style.position = 'absolute'),
                      (d.style.top = p.getScrollY() + 'px'))),
                void 0 === V && (Pt('initialLayout'), (V = Q = p.getScrollY()))
              e = 'pswp--open '
              for (
                A.mainClass && (e += A.mainClass + ' '),
                  A.showHideOpacity && (e += 'pswp--animate_opacity '),
                  e += H ? 'pswp--touch' : 'pswp--notouch',
                  e += Y.animationName ? ' pswp--css_animation' : '',
                  e += Y.svg ? ' pswp--svg' : '',
                  p.addClass(d, e),
                  m.updateSize(),
                  C = -1,
                  It = null,
                  t = 0;
                t < 3;
                t++
              )
                $t((t + C) * kt.x, P[t].el.style)
              G || p.bind(m.scrollWrap, E, m),
                a('initialZoomInEnd', function () {
                  m.setContent(P[0], x - 1),
                    m.setContent(P[2], x + 1),
                    (P[0].el.style.display = P[2].el.style.display = 'block'),
                    A.focus && d.focus(),
                    p.bind(document, 'keydown', m),
                    Y.transform && p.bind(m.scrollWrap, 'click', m),
                    A.mouseUsed || p.bind(document, 'mousemove', Qt),
                    p.bind(window, 'resize scroll orientationchange', m),
                    Pt('bindEvents')
                }),
                m.setContent(P[1], x),
                m.updateCurrItem(),
                Pt('afterInit'),
                St ||
                  (z = setInterval(function () {
                    qt ||
                      nt ||
                      ut ||
                      I !== m.currItem.initialZoomLevel ||
                      m.updateSize()
                  }, 1e3)),
                p.addClass(d, 'pswp--visible')
            }
          },
          close: function () {
            v &&
              ((y = !(v = !1)),
              Pt('close'),
              p.unbind(window, 'resize scroll orientationchange', m),
              p.unbind(window, 'scroll', k.scroll),
              p.unbind(document, 'keydown', m),
              p.unbind(document, 'mousemove', Qt),
              Y.transform && p.unbind(m.scrollWrap, 'click', m),
              nt && p.unbind(window, T, m),
              clearTimeout(X),
              Pt('unbindEvents'),
              qe(m.currItem, null, !0, m.destroy))
          },
          destroy: function () {
            Pt('destroy'),
              Ue && clearTimeout(Ue),
              d.setAttribute('aria-hidden', 'true'),
              (d.className = U),
              z && clearInterval(z),
              p.unbind(m.scrollWrap, E, m),
              p.unbind(window, 'scroll', m),
              _e(),
              te(),
              (Bt = null)
          },
          panTo: function (t, e, i) {
            i ||
              (t > dt.min.x ? (t = dt.min.x) : t < dt.max.x && (t = dt.max.x),
              e > dt.min.y ? (e = dt.min.y) : e < dt.max.y && (e = dt.max.y)),
              (bt.x = t),
              (bt.y = e),
              Lt()
          },
          handleEvent: function (t) {
            ;(t = t || window.event), k[t.type] && k[t.type](t)
          },
          goTo: function (t) {
            var e = (t = r(t)) - x
            ;(It = e),
              (x = t),
              (m.currItem = Ye(x)),
              (Tt -= e),
              Wt(kt.x * Tt),
              te(),
              (mt = !1),
              m.updateCurrItem()
          },
          next: function () {
            m.goTo(x + 1)
          },
          prev: function () {
            m.goTo(x - 1)
          },
          updateCurrZoomItem: function (t) {
            var e
            t && Pt('beforeChange', 0),
              (pt = P[1].el.children.length
                ? ((e = P[1].el.children[0]),
                  p.hasClass(e, 'pswp__zoom-wrap') ? e.style : null)
                : null),
              (dt = m.currItem.bounds),
              (S = I = m.currItem.initialZoomLevel),
              (bt.x = dt.center.x),
              (bt.y = dt.center.y),
              t && Pt('afterChange')
          },
          invalidateCurrItems: function () {
            B = !0
            for (var t = 0; t < 3; t++)
              P[t].item && (P[t].item.needsUpdate = !0)
          },
          updateCurrItem: function (t) {
            if (0 !== It) {
              var e,
                i = Math.abs(It)
              if (!(t && i < 2)) {
                ;(m.currItem = Ye(x)),
                  (zt = !1),
                  Pt('beforeChange', It),
                  3 <= i && ((C += It + (0 < It ? -3 : 3)), (i = 3))
                for (var n = 0; n < i; n++)
                  0 < It
                    ? ((e = P.shift()),
                      (P[2] = e),
                      $t((++C + 2) * kt.x, e.el.style),
                      m.setContent(e, x - i + n + 1 + 1))
                    : ((e = P.pop()),
                      P.unshift(e),
                      $t(--C * kt.x, e.el.style),
                      m.setContent(e, x + i - n - 1 - 1))
                !pt ||
                  1 !== Math.abs(It) ||
                  ((t = Ye(F)).initialZoomLevel !== I &&
                    (ni(t, Ct), oi(t), Zt(t))),
                  (It = 0),
                  m.updateCurrZoomItem(),
                  (F = x),
                  Pt('afterChange')
              }
            }
          },
          updateSize: function (t) {
            if (!St && A.modal) {
              var e = p.getScrollY()
              if (
                (V !== e && ((d.style.top = e + 'px'), (V = e)),
                !t && Mt.x === window.innerWidth && Mt.y === window.innerHeight)
              )
                return
              ;(Mt.x = window.innerWidth),
                (Mt.y = window.innerHeight),
                (d.style.height = Mt.y + 'px')
            }
            if (
              ((Ct.x = m.scrollWrap.clientWidth),
              (Ct.y = m.scrollWrap.clientHeight),
              h(),
              (kt.x = Ct.x + Math.round(Ct.x * A.spacing)),
              (kt.y = Ct.y),
              Wt(kt.x * Tt),
              Pt('beforeResize'),
              void 0 !== C)
            ) {
              for (var i, n, s, o = 0; o < 3; o++)
                (i = P[o]),
                  $t((o + C) * kt.x, i.el.style),
                  (s = x + o - 1),
                  A.loop && 2 < Xe() && (s = r(s)),
                  (n = Ye(s)) && (B || n.needsUpdate || !n.bounds)
                    ? (m.cleanSlide(n),
                      m.setContent(i, s),
                      1 === o && ((m.currItem = n), m.updateCurrZoomItem(!0)),
                      (n.needsUpdate = !1))
                    : -1 === i.index && 0 <= s && m.setContent(i, s),
                  n && n.container && (ni(n, Ct), oi(n), Zt(n))
              B = !1
            }
            ;(S = I = m.currItem.initialZoomLevel),
              (dt = m.currItem.bounds) &&
                ((bt.x = dt.center.x), (bt.y = dt.center.y), Lt(!0)),
              Pt('resize')
          },
          zoomTo: function (e, t, i, n, s) {
            t &&
              ((S = I),
              (ge.x = Math.abs(t.x) - bt.x),
              (ge.y = Math.abs(t.y) - bt.y),
              jt(xt, bt))
            var t = Gt(e, !1),
              o = {}
            l('x', t, o, e), l('y', t, o, e)
            var r = I,
              a = { x: bt.x, y: bt.y }
            Nt(o)
            t = function (t) {
              1 === t
                ? ((I = e), (bt.x = o.x), (bt.y = o.y))
                : ((I = (e - r) * t + r),
                  (bt.x = (o.x - a.x) * t + a.x),
                  (bt.y = (o.y - a.y) * t + a.y)),
                s && s(t),
                Lt(1 === t)
            }
            i ? ee('customZoomTo', 0, 1, i, n || p.easing.sine.inOut, t) : t(1)
          },
        },
        ie = 30,
        ne = 10,
        se = {},
        oe = {},
        re = {},
        ae = {},
        le = {},
        ce = [],
        ue = {},
        he = [],
        de = {},
        pe = 0,
        me = n(),
        Ae = 0,
        fe = n(),
        ge = n(),
        we = n(),
        ve = function (t, e) {
          return t.x === e.x && t.y === e.y
        },
        ye = function (t, e) {
          return (
            (de.x = Math.abs(t.x - e.x)),
            (de.y = Math.abs(t.y - e.y)),
            Math.sqrt(de.x * de.x + de.y * de.y)
          )
        },
        _e = function () {
          at && (N(at), (at = null))
        },
        xe = function () {
          nt && ((at = j(xe)), Re())
        },
        be = function () {
          return !('fit' === A.scaleMode && I === m.currItem.initialZoomLevel)
        },
        Ce = function (t, e) {
          return (
            !(!t || t === document) &&
            !(
              t.getAttribute('class') &&
              -1 < t.getAttribute('class').indexOf('pswp__scroll-wrap')
            ) &&
            (e(t) ? t : Ce(t.parentNode, e))
          )
        },
        Te = {},
        Ee = function (t, e) {
          return (
            (Te.prevent = !Ce(t.target, A.isClickableElement)),
            Pt('preventDragEvent', t, e, Te),
            Te.prevent
          )
        },
        ke = function (t, e) {
          return (e.x = t.pageX), (e.y = t.pageY), (e.id = t.identifier), e
        },
        Ie = function (t, e, i) {
          ;(i.x = 0.5 * (t.x + e.x)), (i.y = 0.5 * (t.y + e.y))
        },
        Se = function (t, e, i) {
          var n
          50 < t - K &&
            (((n = 2 < he.length ? he.shift() : {}).x = e),
            (n.y = i),
            he.push(n),
            (K = t))
        },
        De = function () {
          var t = bt.y - m.currItem.initialPosition.y
          return 1 - Math.abs(t / (Ct.y / 2))
        },
        Me = {},
        ze = {},
        Be = [],
        Pe = function (t) {
          for (; 0 < Be.length; ) Be.pop()
          return (
            W
              ? ((yt = 0),
                ce.forEach(function (t) {
                  0 === yt ? (Be[0] = t) : 1 === yt && (Be[1] = t), yt++
                }))
              : -1 < t.type.indexOf('touch')
              ? t.touches &&
                0 < t.touches.length &&
                ((Be[0] = ke(t.touches[0], Me)),
                1 < t.touches.length && (Be[1] = ke(t.touches[1], ze)))
              : ((Me.x = t.pageX),
                (Me.y = t.pageY),
                (Me.id = ''),
                (Be[0] = Me)),
            Be
          )
        },
        Fe = function (t, e) {
          var i,
            n,
            s,
            o = bt[t] + e[t],
            r = 0 < e[t],
            a = fe.x + e.x,
            l = fe.x - ue.x,
            c = o > dt.min[t] || o < dt.max[t] ? A.panEndFriction : 1,
            o = bt[t] + e[t] * c
          if (
            (A.allowPanToNext || I === m.currItem.initialZoomLevel) &&
            (pt
              ? 'h' !== At ||
                'x' !== t ||
                ot ||
                (r
                  ? (o > dt.min[t] &&
                      ((c = A.panEndFriction),
                      dt.min[t],
                      (i = dt.min[t] - xt[t])),
                    (i <= 0 || l < 0) && 1 < Xe()
                      ? ((s = a), l < 0 && a > ue.x && (s = ue.x))
                      : dt.min.x !== dt.max.x && (n = o))
                  : (o < dt.max[t] &&
                      ((c = A.panEndFriction),
                      dt.max[t],
                      (i = xt[t] - dt.max[t])),
                    (i <= 0 || 0 < l) && 1 < Xe()
                      ? ((s = a), 0 < l && a < ue.x && (s = ue.x))
                      : dt.min.x !== dt.max.x && (n = o)))
              : (s = a),
            'x' === t)
          )
            return (
              void 0 !== s && (Wt(s, !0), (lt = s !== ue.x)),
              dt.min.x !== dt.max.x &&
                (void 0 !== n ? (bt.x = n) : lt || (bt.x += e.x * c)),
              void 0 !== s
            )
          mt || lt || (I > m.currItem.fitRatio && (bt[t] += e[t] * c))
        },
        Re = function () {
          if (ct) {
            var t,
              e,
              i,
              n,
              s = ct.length
            if (0 !== s)
              if (
                (jt(se, ct[0]),
                (re.x = se.x - ae.x),
                (re.y = se.y - ae.y),
                ut && 1 < s)
              )
                (ae.x = se.x),
                  (ae.y = se.y),
                  (!re.x && !re.y && ve(ct[1], oe)) ||
                    (jt(oe, ct[1]),
                    ot || ((ot = !0), Pt('zoomGestureStarted')),
                    (t = ye(se, oe)),
                    (o = $e(t)) >
                      m.currItem.initialZoomLevel +
                        m.currItem.initialZoomLevel / 15 && (vt = !0),
                    (e = 1),
                    (i = Vt()),
                    (n = Yt()),
                    o < i
                      ? A.pinchToClose &&
                        !vt &&
                        S <= m.currItem.initialZoomLevel
                        ? (Rt((s = 1 - (i - o) / (i / 1.2))),
                          Pt('onPinchClose', s),
                          (gt = !0))
                        : (o =
                            i - (e = 1 < (e = (i - o) / i) ? 1 : e) * (i / 3))
                      : n < o &&
                        (o = n + (e = 1 < (e = (o - n) / (6 * i)) ? 1 : e) * i),
                    e < 0 && (e = 0),
                    Ie(se, oe, me),
                    (_t.x += me.x - we.x),
                    (_t.y += me.y - we.y),
                    jt(we, me),
                    (bt.x = Ht('x', o)),
                    (bt.y = Ht('y', o)),
                    (tt = I < o),
                    (I = o),
                    Lt())
              else if (
                At &&
                (ft &&
                  ((ft = !1),
                  Math.abs(re.x) >= ne && (re.x -= ct[0].x - le.x),
                  Math.abs(re.y) >= ne && (re.y -= ct[0].y - le.y)),
                (ae.x = se.x),
                (ae.y = se.y),
                0 !== re.x || 0 !== re.y)
              ) {
                if ('v' === At && A.closeOnVerticalDrag && !be()) {
                  ;(_t.y += re.y), (bt.y += re.y)
                  var o = De()
                  return (et = !0), Pt('onVerticalDrag', o), Rt(o), void Lt()
                }
                Se(Ft(), se.x, se.y),
                  (rt = !0),
                  (dt = m.currItem.bounds),
                  Fe('x', re) || (Fe('y', re), Nt(bt), Lt())
              }
          }
        },
        Oe = function () {
          var e,
            i,
            n = {
              lastFlickOffset: {},
              lastFlickDist: {},
              lastFlickSpeed: {},
              slowDownRatio: {},
              slowDownRatioReverse: {},
              speedDecelerationRatio: {},
              speedDecelerationRatioAbs: {},
              distanceOffset: {},
              backAnimDestination: {},
              backAnimStarted: {},
              calculateSwipeSpeed: function (t) {
                ;(i =
                  1 < he.length
                    ? ((e = Ft() - K + 50), he[he.length - 2][t])
                    : ((e = Ft() - q), le[t])),
                  (n.lastFlickOffset[t] = ae[t] - i),
                  (n.lastFlickDist[t] = Math.abs(n.lastFlickOffset[t])),
                  20 < n.lastFlickDist[t]
                    ? (n.lastFlickSpeed[t] = n.lastFlickOffset[t] / e)
                    : (n.lastFlickSpeed[t] = 0),
                  Math.abs(n.lastFlickSpeed[t]) < 0.1 &&
                    (n.lastFlickSpeed[t] = 0),
                  (n.slowDownRatio[t] = 0.95),
                  (n.slowDownRatioReverse[t] = 1 - n.slowDownRatio[t]),
                  (n.speedDecelerationRatio[t] = 1)
              },
              calculateOverBoundsAnimOffset: function (e, t) {
                n.backAnimStarted[e] ||
                  (bt[e] > dt.min[e]
                    ? (n.backAnimDestination[e] = dt.min[e])
                    : bt[e] < dt.max[e] &&
                      (n.backAnimDestination[e] = dt.max[e]),
                  void 0 !== n.backAnimDestination[e] &&
                    ((n.slowDownRatio[e] = 0.7),
                    (n.slowDownRatioReverse[e] = 1 - n.slowDownRatio[e]),
                    n.speedDecelerationRatioAbs[e] < 0.05 &&
                      ((n.lastFlickSpeed[e] = 0),
                      (n.backAnimStarted[e] = !0),
                      ee(
                        'bounceZoomPan' + e,
                        bt[e],
                        n.backAnimDestination[e],
                        t || 300,
                        p.easing.sine.out,
                        function (t) {
                          ;(bt[e] = t), Lt()
                        }
                      ))))
              },
              calculateAnimOffset: function (t) {
                n.backAnimStarted[t] ||
                  ((n.speedDecelerationRatio[t] =
                    n.speedDecelerationRatio[t] *
                    (n.slowDownRatio[t] +
                      n.slowDownRatioReverse[t] -
                      (n.slowDownRatioReverse[t] * n.timeDiff) / 10)),
                  (n.speedDecelerationRatioAbs[t] = Math.abs(
                    n.lastFlickSpeed[t] * n.speedDecelerationRatio[t]
                  )),
                  (n.distanceOffset[t] =
                    n.lastFlickSpeed[t] *
                    n.speedDecelerationRatio[t] *
                    n.timeDiff),
                  (bt[t] += n.distanceOffset[t]))
              },
              panAnimLoop: function () {
                Xt.zoomPan &&
                  ((Xt.zoomPan.raf = j(n.panAnimLoop)),
                  (n.now = Ft()),
                  (n.timeDiff = n.now - n.lastNow),
                  (n.lastNow = n.now),
                  n.calculateAnimOffset('x'),
                  n.calculateAnimOffset('y'),
                  Lt(),
                  n.calculateOverBoundsAnimOffset('x'),
                  n.calculateOverBoundsAnimOffset('y'),
                  n.speedDecelerationRatioAbs.x < 0.05 &&
                    n.speedDecelerationRatioAbs.y < 0.05 &&
                    ((bt.x = Math.round(bt.x)),
                    (bt.y = Math.round(bt.y)),
                    Lt(),
                    Kt('zoomPan')))
              },
            }
          return n
        },
        Le = function (t) {
          if (
            (t.calculateSwipeSpeed('y'),
            (dt = m.currItem.bounds),
            (t.backAnimDestination = {}),
            (t.backAnimStarted = {}),
            Math.abs(t.lastFlickSpeed.x) <= 0.05 &&
              Math.abs(t.lastFlickSpeed.y) <= 0.05)
          )
            return (
              (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y =
                0),
              t.calculateOverBoundsAnimOffset('x'),
              t.calculateOverBoundsAnimOffset('y'),
              !0
            )
          Jt('zoomPan'), (t.lastNow = Ft()), t.panAnimLoop()
        },
        Ze = function (t, e) {
          var i, n
          mt || (pe = x),
            'swipe' === t &&
              ((n = ae.x - le.x),
              (t = e.lastFlickDist.x < 10),
              ie < n && (t || 20 < e.lastFlickOffset.x)
                ? (o = -1)
                : n < -ie && (t || e.lastFlickOffset.x < -20) && (o = 1)),
            o &&
              ((x += o) < 0
                ? ((x = A.loop ? Xe() - 1 : 0), (s = !0))
                : x >= Xe() && ((x = A.loop ? 0 : Xe() - 1), (s = !0)),
              (s && !A.loop) || ((It += o), (Tt -= o), (i = !0)))
          var s = kt.x * Tt,
            o = Math.abs(s - fe.x),
            r =
              i || s > fe.x == 0 < e.lastFlickSpeed.x
                ? ((r =
                    0 < Math.abs(e.lastFlickSpeed.x)
                      ? o / Math.abs(e.lastFlickSpeed.x)
                      : 333),
                  (r = Math.min(r, 400)),
                  Math.max(r, 250))
                : 333
          return (
            pe === x && (i = !1),
            (mt = !0),
            Pt('mainScrollAnimStart'),
            ee('mainScroll', fe.x, s, r, p.easing.cubic.out, Wt, function () {
              te(),
                (mt = !1),
                (pe = -1),
                (!i && pe === x) || m.updateCurrItem(),
                Pt('mainScrollAnimComplete')
            }),
            i && m.updateCurrItem(!0),
            i
          )
        },
        $e = function (t) {
          return (1 / ht) * t * S
        },
        We = function () {
          var t = I,
            e = Vt(),
            i = Yt()
          I < e ? (t = e) : i < I && (t = i)
          var n,
            s = wt
          return (
            gt && !tt && !vt && I < e
              ? m.close()
              : (gt &&
                  (n = function (t) {
                    Rt((1 - s) * t + s)
                  }),
                m.zoomTo(t, 0, 200, p.easing.cubic.out, n)),
            !0
          )
        }
      s('Gestures', {
        publicMethods: {
          initGestures: function () {
            function t(t, e, i, n, s) {
              ;(R = t + e), (O = t + i), (L = t + n), (Z = s ? t + s : '')
            }
            ;(W = Y.pointerEvent) && Y.touch && (Y.touch = !1),
              W
                ? navigator.pointerEnabled
                  ? t('pointer', 'down', 'move', 'up', 'cancel')
                  : t('MSPointer', 'Down', 'Move', 'Up', 'Cancel')
                : Y.touch
                ? (t('touch', 'start', 'move', 'end', 'cancel'), (H = !0))
                : t('mouse', 'down', 'move', 'up'),
              (T = O + ' ' + L + ' ' + Z),
              (E = R),
              W &&
                !H &&
                (H =
                  1 < navigator.maxTouchPoints ||
                  1 < navigator.msMaxTouchPoints),
              (m.likelyTouchDevice = H),
              (k[R] = f),
              (k[O] = g),
              (k[L] = w),
              Z && (k[Z] = k[L]),
              Y.touch &&
                ((E += ' mousedown'),
                (T += ' mousemove mouseup'),
                (k.mousedown = k[R]),
                (k.mousemove = k[O]),
                (k.mouseup = k[L])),
              H || (A.allowPanToNext = !1)
          },
        },
      })
      function He(t) {
        function e() {
          ;(t.loading = !1),
            (t.loaded = !0),
            t.loadComplete ? t.loadComplete(t) : (t.img = null),
            (i.onload = i.onerror = null),
            (i = null)
        }
        ;(t.loading = !0), (t.loaded = !1)
        var i = (t.img = p.createEl('pswp__img', 'img'))
        return (
          (i.onload = e),
          (i.onerror = function () {
            ;(t.loadError = !0), e()
          }),
          (i.src = t.src),
          i
        )
      }
      function je(t, e) {
        return (
          t.src &&
          t.loadError &&
          t.container &&
          (e && (t.container.innerHTML = ''),
          (t.container.innerHTML = A.errorMsg.replace('%url%', t.src)),
          1)
        )
      }
      function Ne() {
        if (Je.length) {
          for (var t, e = 0; e < Je.length; e++)
            (t = Je[e]).holder.index === t.index &&
              si(t.index, t.item, t.baseDiv, t.img, !1, t.clearPlaceholder)
          Je = []
        }
      }
      var Ue,
        Qe,
        Ge,
        Ve,
        Ye,
        Xe,
        qe = function (o, t, r, e) {
          var a
          Ue && clearTimeout(Ue),
            (Ge = Ve = !0),
            o.initialLayout
              ? ((a = o.initialLayout), (o.initialLayout = null))
              : (a = A.getThumbBoundsFn && A.getThumbBoundsFn(x))
          function l() {
            Kt('initialZoom'),
              r
                ? (m.template.removeAttribute('style'),
                  m.bg.removeAttribute('style'))
                : (Rt(1),
                  t && (t.style.display = 'block'),
                  p.addClass(d, 'pswp--animated-in'),
                  Pt('initialZoom' + (r ? 'OutEnd' : 'InEnd'))),
              e && e(),
              (Ve = !1)
          }
          var c = r ? A.hideAnimationDuration : A.showAnimationDuration
          if (!c || !a || void 0 === a.x)
            return (
              Pt('initialZoom' + (r ? 'Out' : 'In')),
              (I = o.initialZoomLevel),
              jt(bt, o.initialPosition),
              Lt(),
              (d.style.opacity = r ? 0 : 1),
              Rt(1),
              void (c
                ? setTimeout(function () {
                    l()
                  }, c)
                : l())
            )
          var u, h
          ;(u = _),
            (h = !m.currItem.src || m.currItem.loadError || A.showHideOpacity),
            o.miniImg && (o.miniImg.style.webkitBackfaceVisibility = 'hidden'),
            r ||
              ((I = a.w / o.w),
              (bt.x = a.x),
              (bt.y = a.y - Q),
              (m[h ? 'template' : 'bg'].style.opacity = 0.001),
              Lt()),
            Jt('initialZoom'),
            r && !u && p.removeClass(d, 'pswp--animated-in'),
            h &&
              (r
                ? p[(u ? 'remove' : 'add') + 'Class'](
                    d,
                    'pswp--animate_opacity'
                  )
                : setTimeout(function () {
                    p.addClass(d, 'pswp--animate_opacity')
                  }, 30)),
            (Ue = setTimeout(
              function () {
                var e, i, n, s, t
                Pt('initialZoom' + (r ? 'Out' : 'In')),
                  r
                    ? ((e = a.w / o.w),
                      (i = { x: bt.x, y: bt.y }),
                      (n = I),
                      (s = wt),
                      (t = function (t) {
                        1 === t
                          ? ((I = e), (bt.x = a.x), (bt.y = a.y - V))
                          : ((I = (e - n) * t + n),
                            (bt.x = (a.x - i.x) * t + i.x),
                            (bt.y = (a.y - V - i.y) * t + i.y)),
                          Lt(),
                          h ? (d.style.opacity = 1 - t) : Rt(s - t * s)
                      }),
                      u
                        ? ee('initialZoom', 0, 1, c, p.easing.cubic.out, t, l)
                        : (t(1), (Ue = setTimeout(l, c + 20))))
                    : ((I = o.initialZoomLevel),
                      jt(bt, o.initialPosition),
                      Lt(),
                      Rt(1),
                      h ? (d.style.opacity = 1) : Rt(1),
                      (Ue = setTimeout(l, c + 20)))
              },
              r ? 25 : 90
            ))
        },
        Ke = {},
        Je = [],
        ti = {
          index: 0,
          errorMsg:
            '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading: !1,
          preload: [1, 1],
          getNumItemsFn: function () {
            return Qe.length
          },
        },
        ei = function () {
          return {
            center: { x: 0, y: 0 },
            max: { x: 0, y: 0 },
            min: { x: 0, y: 0 },
          }
        },
        ii = function (t, e, i) {
          var n = t.bounds
          ;(n.center.x = Math.round((Ke.x - e) / 2)),
            (n.center.y = Math.round((Ke.y - i) / 2) + t.vGap.top),
            (n.max.x = e > Ke.x ? Math.round(Ke.x - e) : n.center.x),
            (n.max.y =
              i > Ke.y ? Math.round(Ke.y - i) + t.vGap.top : n.center.y),
            (n.min.x = e > Ke.x ? 0 : n.center.x),
            (n.min.y = i > Ke.y ? t.vGap.top : n.center.y)
        },
        ni = function (t, e, i) {
          if (!t.src || t.loadError)
            return (
              (t.w = t.h = 0),
              (t.initialZoomLevel = t.fitRatio = 1),
              (t.bounds = ei()),
              (t.initialPosition = t.bounds.center),
              t.bounds
            )
          var n,
            s = !i
          return (
            s &&
              (t.vGap || (t.vGap = { top: 0, bottom: 0 }),
              Pt('parseVerticalMargin', t)),
            (Ke.x = e.x),
            (Ke.y = e.y - t.vGap.top - t.vGap.bottom),
            s &&
              ((n = Ke.x / t.w),
              (e = Ke.y / t.h),
              (t.fitRatio = n < e ? n : e),
              'orig' === (e = A.scaleMode)
                ? (i = 1)
                : 'fit' === e && (i = t.fitRatio),
              (t.initialZoomLevel = i = 1 < i ? 1 : i),
              t.bounds || (t.bounds = ei())),
            i
              ? (ii(t, t.w * i, t.h * i),
                s &&
                  i === t.initialZoomLevel &&
                  (t.initialPosition = t.bounds.center),
                t.bounds)
              : void 0
          )
        },
        si = function (t, e, i, n, s, o) {
          e.loadError ||
            (n &&
              ((e.imageAppended = !0),
              oi(e, n, e === m.currItem && zt),
              i.appendChild(n),
              o &&
                setTimeout(function () {
                  e &&
                    e.loaded &&
                    e.placeholder &&
                    ((e.placeholder.style.display = 'none'),
                    (e.placeholder = null))
                }, 500)))
        },
        oi = function (t, e, i) {
          var n
          t.src &&
            ((e = e || t.container.lastChild),
            (n = i ? t.w : Math.round(t.w * t.fitRatio)),
            (i = i ? t.h : Math.round(t.h * t.fitRatio)),
            t.placeholder &&
              !t.loaded &&
              ((t.placeholder.style.width = n + 'px'),
              (t.placeholder.style.height = i + 'px')),
            (e.style.width = n + 'px'),
            (e.style.height = i + 'px'))
        }
      s('Controller', {
        publicMethods: {
          lazyLoadItem: function (t) {
            t = r(t)
            var e = Ye(t)
            e &&
              ((!e.loaded && !e.loading) || B) &&
              (Pt('gettingData', t, e), e.src && He(e))
          },
          initController: function () {
            p.extend(A, ti, !0),
              (m.items = Qe = t),
              (Ye = m.getItemAt),
              (Xe = A.getNumItemsFn),
              A.loop,
              Xe() < 3 && (A.loop = !1),
              a('beforeChange', function (t) {
                for (
                  var e = A.preload,
                    i = null === t || 0 <= t,
                    n = Math.min(e[0], Xe()),
                    s = Math.min(e[1], Xe()),
                    o = 1;
                  o <= (i ? s : n);
                  o++
                )
                  m.lazyLoadItem(x + o)
                for (o = 1; o <= (i ? n : s); o++) m.lazyLoadItem(x - o)
              }),
              a('initialLayout', function () {
                m.currItem.initialLayout =
                  A.getThumbBoundsFn && A.getThumbBoundsFn(x)
              }),
              a('mainScrollAnimComplete', Ne),
              a('initialZoomInEnd', Ne),
              a('destroy', function () {
                for (var t, e = 0; e < Qe.length; e++)
                  (t = Qe[e]).container && (t.container = null),
                    t.placeholder && (t.placeholder = null),
                    t.img && (t.img = null),
                    t.preloader && (t.preloader = null),
                    t.loadError && (t.loaded = t.loadError = !1)
                Je = null
              })
          },
          getItemAt: function (t) {
            return 0 <= t && void 0 !== Qe[t] && Qe[t]
          },
          allowProgressiveImg: function () {
            return (
              A.forceProgressiveLoading ||
              !H ||
              A.mouseUsed ||
              1200 < screen.width
            )
          },
          setContent: function (e, i) {
            A.loop && (i = r(i))
            var t = m.getItemAt(e.index)
            t && (t.container = null)
            var n,
              s,
              o = m.getItemAt(i)
            o
              ? (Pt('gettingData', i, o),
                (e.index = i),
                (s = (e.item = o).container = p.createEl('pswp__zoom-wrap')),
                !o.src &&
                  o.html &&
                  (o.html.tagName
                    ? s.appendChild(o.html)
                    : (s.innerHTML = o.html)),
                je(o),
                ni(o, Ct),
                !o.src || o.loadError || o.loaded
                  ? o.src &&
                    !o.loadError &&
                    (((n = p.createEl('pswp__img', 'img')).style.opacity = 1),
                    (n.src = o.src),
                    oi(o, n),
                    si(i, o, s, n, !0))
                  : ((o.loadComplete = function (t) {
                      if (v) {
                        if (e && e.index === i) {
                          if (je(t, !0))
                            return (
                              (t.loadComplete = t.img = null),
                              ni(t, Ct),
                              Zt(t),
                              void (e.index === x && m.updateCurrZoomItem())
                            )
                          t.imageAppended
                            ? !Ve &&
                              t.placeholder &&
                              ((t.placeholder.style.display = 'none'),
                              (t.placeholder = null))
                            : Y.transform && (mt || Ve)
                            ? Je.push({
                                item: t,
                                baseDiv: s,
                                img: t.img,
                                index: i,
                                holder: e,
                                clearPlaceholder: !0,
                              })
                            : si(i, t, s, t.img, mt || Ve, !0)
                        }
                        ;(t.loadComplete = null),
                          (t.img = null),
                          Pt('imageLoadComplete', i, t)
                      }
                    }),
                    p.features.transform &&
                      ((t = 'pswp__img pswp__img--placeholder'),
                      (t += o.msrc ? '' : ' pswp__img--placeholder--blank'),
                      (t = p.createEl(t, o.msrc ? 'img' : '')),
                      o.msrc && (t.src = o.msrc),
                      oi(o, t),
                      s.appendChild(t),
                      (o.placeholder = t)),
                    o.loading || He(o),
                    m.allowProgressiveImg() &&
                      (!Ge && Y.transform
                        ? Je.push({
                            item: o,
                            baseDiv: s,
                            img: o.img,
                            index: i,
                            holder: e,
                          })
                        : si(i, o, s, o.img, !0, !0))),
                Ge || i !== x ? Zt(o) : ((pt = s.style), qe(o, n || o.img)),
                (e.el.innerHTML = ''),
                e.el.appendChild(s))
              : (e.el.innerHTML = '')
          },
          cleanSlide: function (t) {
            t.img && (t.img.onload = t.img.onerror = null),
              (t.loaded = t.loading = t.img = t.imageAppended = !1)
          },
        },
      })
      function ri(t, e, i) {
        var n = document.createEvent('CustomEvent'),
          i = {
            origEvent: t,
            target: t.target,
            releasePoint: e,
            pointerType: i || 'touch',
          }
        n.initCustomEvent('pswpTap', !0, !0, i), t.target.dispatchEvent(n)
      }
      var ai,
        li,
        ci = {}
      s('Tap', {
        publicMethods: {
          initTap: function () {
            a('firstTouchStart', m.onTapStart),
              a('touchRelease', m.onTapRelease),
              a('destroy', function () {
                ;(ci = {}), (ai = null)
              })
          },
          onTapStart: function (t) {
            1 < t.length && (clearTimeout(ai), (ai = null))
          },
          onTapRelease: function (t, e) {
            var i, n, s
            e &&
              (rt ||
                st ||
                qt ||
                ((i = e),
                ai &&
                (clearTimeout(ai),
                (ai = null),
                (n = i),
                (s = ci),
                Math.abs(n.x - s.x) < o && Math.abs(n.y - s.y) < o)
                  ? Pt('doubleTap', i)
                  : 'mouse' !== e.type
                  ? 'BUTTON' === t.target.tagName.toUpperCase() ||
                    p.hasClass(t.target, 'pswp__single-tap')
                    ? ri(t, e)
                    : (jt(ci, i),
                      (ai = setTimeout(function () {
                        ri(t, e), (ai = null)
                      }, 300)))
                  : ri(t, e, 'mouse')))
          },
        },
      }),
        s('DesktopZoom', {
          publicMethods: {
            initDesktopZoom: function () {
              G ||
                (H
                  ? a('mouseUsed', function () {
                      m.setupDesktopZoom()
                    })
                  : m.setupDesktopZoom(!0))
            },
            setupDesktopZoom: function (t) {
              li = {}
              var e = 'wheel mousewheel DOMMouseScroll'
              a('bindEvents', function () {
                p.bind(d, e, m.handleMouseWheel)
              }),
                a('unbindEvents', function () {
                  li && p.unbind(d, e, m.handleMouseWheel)
                }),
                (m.mouseZoomedIn = !1)
              function i() {
                m.mouseZoomedIn &&
                  (p.removeClass(d, 'pswp--zoomed-in'), (m.mouseZoomedIn = !1)),
                  I < 1
                    ? p.addClass(d, 'pswp--zoom-allowed')
                    : p.removeClass(d, 'pswp--zoom-allowed'),
                  s()
              }
              var n,
                s = function () {
                  n && (p.removeClass(d, 'pswp--dragging'), (n = !1))
                }
              a('resize', i),
                a('afterChange', i),
                a('pointerDown', function () {
                  m.mouseZoomedIn && ((n = !0), p.addClass(d, 'pswp--dragging'))
                }),
                a('pointerUp', s),
                t || i()
            },
            handleMouseWheel: function (t) {
              if (I <= m.currItem.fitRatio)
                return (
                  A.modal &&
                    (!A.closeOnScroll || qt || nt
                      ? t.preventDefault()
                      : $ && 2 < Math.abs(t.deltaY) && ((_ = !0), m.close())),
                  !0
                )
              if ((t.stopPropagation(), (li.x = 0), 'deltaX' in t))
                1 === t.deltaMode
                  ? ((li.x = 18 * t.deltaX), (li.y = 18 * t.deltaY))
                  : ((li.x = t.deltaX), (li.y = t.deltaY))
              else if ('wheelDelta' in t)
                t.wheelDeltaX && (li.x = -0.16 * t.wheelDeltaX),
                  t.wheelDeltaY
                    ? (li.y = -0.16 * t.wheelDeltaY)
                    : (li.y = -0.16 * t.wheelDelta)
              else {
                if (!('detail' in t)) return
                li.y = t.detail
              }
              Gt(I, !0)
              var e = bt.x - li.x,
                i = bt.y - li.y
              ;(A.modal ||
                (e <= dt.min.x &&
                  e >= dt.max.x &&
                  i <= dt.min.y &&
                  i >= dt.max.y)) &&
                t.preventDefault(),
                m.panTo(e, i)
            },
            toggleDesktopZoom: function (t) {
              t = t || { x: Ct.x / 2 + Et.x, y: Ct.y / 2 + Et.y }
              var e = A.getDoubleTapZoom(!0, m.currItem),
                i = I === e
              ;(m.mouseZoomedIn = !i),
                m.zoomTo(i ? m.currItem.initialZoomLevel : e, t, 333),
                p[(i ? 'remove' : 'add') + 'Class'](d, 'pswp--zoomed-in')
            },
          },
        })
      function ui() {
        di && clearTimeout(di), mi && clearTimeout(mi)
      }
      function hi() {
        var t = Ti(),
          e = {}
        if (t.length < 5) return e
        var i,
          n = t.split('&')
        for (o = 0; o < n.length; o++)
          n[o] && ((i = n[o].split('=')).length < 2 || (e[i[0]] = i[1]))
        if (A.galleryPIDs) {
          for (var s = e.pid, o = (e.pid = 0); o < Qe.length; o++)
            if (Qe[o].pid === s) {
              e.pid = o
              break
            }
        } else e.pid = parseInt(e.pid, 10) - 1
        return e.pid < 0 && (e.pid = 0), e
      }
      var di,
        pi,
        mi,
        Ai,
        fi,
        gi,
        wi,
        vi,
        yi,
        _i,
        xi,
        bi,
        Ci = { history: !0, galleryUID: 1 },
        Ti = function () {
          return xi.hash.substring(1)
        },
        Ei = function () {
          var t, e
          mi && clearTimeout(mi),
            qt || nt
              ? (mi = setTimeout(Ei, 500))
              : (Ai ? clearTimeout(pi) : (Ai = !0),
                (e = x + 1),
                (t = Ye(x)).hasOwnProperty('pid') && (e = t.pid),
                (t = wi + '&gid=' + A.galleryUID + '&pid=' + e),
                vi || (-1 === xi.hash.indexOf(t) && (_i = !0)),
                (e = xi.href.split('#')[0] + '#' + t),
                bi
                  ? '#' + t !== window.location.hash &&
                    history[vi ? 'replaceState' : 'pushState'](
                      '',
                      document.title,
                      e
                    )
                  : vi
                  ? xi.replace(e)
                  : (xi.hash = t),
                (vi = !0),
                (pi = setTimeout(function () {
                  Ai = !1
                }, 60)))
        }
      s('History', {
        publicMethods: {
          initHistory: function () {
            var t, e
            p.extend(A, Ci, !0),
              A.history &&
                ((xi = window.location),
                (vi = yi = _i = !1),
                (wi = Ti()),
                (bi = 'pushState' in history),
                -1 < wi.indexOf('gid=') &&
                  (wi = (wi = wi.split('&gid=')[0]).split('?gid=')[0]),
                a('afterChange', m.updateURL),
                a('unbindEvents', function () {
                  p.unbind(window, 'hashchange', m.onHashChange)
                }),
                (t = function () {
                  ;(gi = !0),
                    yi ||
                      (_i
                        ? history.back()
                        : wi
                        ? (xi.hash = wi)
                        : bi
                        ? history.pushState(
                            '',
                            document.title,
                            xi.pathname + xi.search
                          )
                        : (xi.hash = '')),
                    ui()
                }),
                a('unbindEvents', function () {
                  _ && t()
                }),
                a('destroy', function () {
                  gi || t()
                }),
                a('firstUpdate', function () {
                  x = hi().pid
                }),
                -1 < (e = wi.indexOf('pid=')) &&
                  '&' === (wi = wi.substring(0, e)).slice(-1) &&
                  (wi = wi.slice(0, -1)),
                setTimeout(function () {
                  v && p.bind(window, 'hashchange', m.onHashChange)
                }, 40))
          },
          onHashChange: function () {
            if (Ti() === wi) return (yi = !0), void m.close()
            Ai || ((fi = !0), m.goTo(hi().pid), (fi = !1))
          },
          updateURL: function () {
            ui(), fi || (vi ? (di = setTimeout(Ei, 800)) : Ei())
          },
        },
      }),
        p.extend(m, e)
    }
  }),
  (function (t) {
    var e,
      s,
      i,
      n,
      o = navigator.userAgent
    function r() {
      clearTimeout(e), (e = setTimeout(i, 99))
    }
    function a() {
      r(), n && n.addListener && n.addListener(r)
    }
    t.HTMLPictureElement &&
      /ecko/.test(o) &&
      o.match(/rv\:(\d+)/) &&
      RegExp.$1 < 45 &&
      addEventListener(
        'resize',
        ((s = document.createElement('source')),
        (i = function () {
          for (
            var t = document.querySelectorAll(
                'picture > img, img[srcset][sizes]'
              ),
              e = 0;
            e < t.length;
            e++
          )
            !(function (t) {
              var e,
                i,
                n = t.parentNode
              'PICTURE' === n.nodeName.toUpperCase()
                ? ((e = s.cloneNode()),
                  n.insertBefore(e, n.firstElementChild),
                  setTimeout(function () {
                    n.removeChild(e)
                  }))
                : (!t._pfLastSize || t.offsetWidth > t._pfLastSize) &&
                  ((t._pfLastSize = t.offsetWidth),
                  (i = t.sizes),
                  (t.sizes += ',100vw'),
                  setTimeout(function () {
                    t.sizes = i
                  }))
            })(t[e])
        }),
        (n = t.matchMedia && matchMedia('(orientation: landscape)')),
        (s.srcset =
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='),
        /^[c|i]|d$/.test(document.readyState || '')
          ? a()
          : document.addEventListener('DOMContentLoaded', a),
        r)
      )
  })(window),
  (function (t, o, c) {
    'use strict'
    var s, u, r
    o.createElement('picture')
    function e() {}
    function i(t, e, i, n) {
      t.addEventListener
        ? t.addEventListener(e, i, n || !1)
        : t.attachEvent && t.attachEvent('on' + e, i)
    }
    var y = {},
      a = !1,
      n = o.createElement('img'),
      h = n.getAttribute,
      d = n.setAttribute,
      p = n.removeAttribute,
      l = o.documentElement,
      m = {},
      _ = { algorithm: '' },
      A = 'data-pfsrc',
      f = A + 'set',
      g = navigator.userAgent,
      x =
        /rident/.test(g) ||
        (/ecko/.test(g) && g.match(/rv\:(\d+)/) && 35 < RegExp.$1),
      b = 'currentSrc',
      w = /\s+\+?\d+(e\d+)?w/,
      v = /(\([^)]+\))?\s*(.+)/,
      C = t.picturefillCFG,
      T = 'font-size:100%!important;',
      E = !0,
      k = {},
      I = {},
      S = t.devicePixelRatio,
      D = { px: 1, in: 96 },
      M = o.createElement('a'),
      z = !1,
      B = /^[ \t\n\r\u000c]+/,
      P = /^[, \t\n\r\u000c]+/,
      F = /^[^ \t\n\r\u000c]+/,
      R = /[,]+$/,
      O = /^\d+$/,
      L = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
      g = function (e) {
        var i = {}
        return function (t) {
          return t in i || (i[t] = e(t)), i[t]
        }
      }
    function Z(t) {
      return ' ' === t || '\t' === t || '\n' === t || '\f' === t || '\r' === t
    }
    function $(t, e) {
      return (
        t.w
          ? ((t.cWidth = y.calcListLength(e || '100vw')),
            (t.res = t.w / t.cWidth))
          : (t.res = t.d),
        t
      )
    }
    var W,
      H,
      j,
      N,
      U,
      Q,
      G,
      V,
      Y,
      X,
      q,
      K,
      J,
      tt,
      et,
      it =
        ((W = /^([\d\.]+)(em|vw|px)$/),
        (H = g(function (t) {
          return (
            'return ' +
            (function () {
              for (var t = arguments, e = 0, i = t[0]; ++e in t; )
                i = i.replace(t[e], t[++e])
              return i
            })(
              (t || '').toLowerCase(),
              /\band\b/g,
              '&&',
              /,/g,
              '||',
              /min-([a-z-\s]+):/g,
              'e.$1>=',
              /max-([a-z-\s]+):/g,
              'e.$1<=',
              /calc([^)]+)/g,
              '($1)',
              /(\d+[\.]*[\d]*)([a-z]+)/g,
              '($1 * e.$2)',
              /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,
              ''
            ) +
            ';'
          )
        })),
        function (t, e) {
          var i
          if (!(t in k))
            if (((k[t] = !1), e && (i = t.match(W)))) k[t] = i[1] * D[i[2]]
            else
              try {
                k[t] = new Function('e', H(t))(D)
              } catch (t) {}
          return k[t]
        }),
      nt = function (t) {
        if (a) {
          var e,
            i,
            n,
            s = t || {}
          if (
            (s.elements &&
              1 === s.elements.nodeType &&
              ('IMG' === s.elements.nodeName.toUpperCase()
                ? (s.elements = [s.elements])
                : ((s.context = s.elements), (s.elements = null))),
            (n = (e =
              s.elements ||
              y.qsa(
                s.context || o,
                s.reevaluate || s.reselect ? y.sel : y.selShort
              )).length))
          ) {
            for (y.setupRun(s), z = !0, i = 0; i < n; i++) y.fillImg(e[i], s)
            y.teardownRun(s)
          }
        }
      }
    function st(t, e) {
      return t.res - e.res
    }
    function ot(t, e) {
      var i, n, s
      if (t && e)
        for (s = y.parseSet(e), t = y.makeUrl(t), i = 0; i < s.length; i++)
          if (t === y.makeUrl(s[i].url)) {
            n = s[i]
            break
          }
      return n
    }
    function rt(e, u) {
      function t(t) {
        var t = t.exec(e.substring(r))
        if (t) return (t = t[0]), (r += t.length), t
      }
      var h,
        d,
        i,
        n,
        s,
        o = e.length,
        r = 0,
        p = []
      function a() {
        for (var t, e, i, n, s, o, r, a = !1, l = {}, c = 0; c < d.length; c++)
          (n = (r = d[c])[r.length - 1]),
            (s = r.substring(0, r.length - 1)),
            (o = parseInt(s, 10)),
            (r = parseFloat(s)),
            O.test(s) && 'w' === n
              ? ((t || e) && (a = !0), 0 === o ? (a = !0) : (t = o))
              : L.test(s) && 'x' === n
              ? ((t || e || i) && (a = !0), r < 0 ? (a = !0) : (e = r))
              : O.test(s) && 'h' === n
              ? ((i || e) && (a = !0), 0 === o ? (a = !0) : (i = o))
              : (a = !0)
        a ||
          ((l.url = h),
          t && (l.w = t),
          e && (l.d = e),
          i && (l.h = i),
          i || e || t || (l.d = 1),
          1 === l.d && (u.has1x = !0),
          (l.set = u),
          p.push(l))
      }
      for (;;) {
        if ((t(P), o <= r)) return p
        ;(h = t(F)),
          (d = []),
          ',' === h.slice(-1)
            ? ((h = h.replace(R, '')), a())
            : (function () {
                for (t(B), i = '', n = 'in descriptor'; ; ) {
                  if (((s = e.charAt(r)), 'in descriptor' === n))
                    if (Z(s))
                      i && (d.push(i), (i = ''), (n = 'after descriptor'))
                    else {
                      if (',' === s) return (r += 1), i && d.push(i), a()
                      if ('(' === s) (i += s), (n = 'in parens')
                      else {
                        if ('' === s) return i && d.push(i), a()
                        i += s
                      }
                    }
                  else if ('in parens' === n)
                    if (')' === s) (i += s), (n = 'in descriptor')
                    else {
                      if ('' === s) return d.push(i), a()
                      i += s
                    }
                  else if ('after descriptor' === n && !Z(s)) {
                    if ('' === s) return a()
                    ;(n = 'in descriptor'), --r
                  }
                  r += 1
                }
              })()
      }
    }
    function at(t) {
      var e,
        i,
        n,
        s,
        o,
        r,
        a =
          /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
        l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i
      for (
        n = (i = (function (t) {
          var e,
            i = '',
            n = [],
            s = [],
            o = 0,
            r = 0,
            a = !1
          function l() {
            i && (n.push(i), (i = ''))
          }
          function c() {
            n[0] && (s.push(n), (n = []))
          }
          for (;;) {
            if ('' === (e = t.charAt(r))) return l(), c(), s
            if (a)
              '*' !== e || '/' !== t[r + 1]
                ? (r += 1)
                : ((a = !1), (r += 2), l())
            else {
              if (Z(e)) {
                if ((t.charAt(r - 1) && Z(t.charAt(r - 1))) || !i) {
                  r += 1
                  continue
                }
                if (0 === o) {
                  l(), (r += 1)
                  continue
                }
                e = ' '
              } else if ('(' === e) o += 1
              else if (')' === e) --o
              else {
                if (',' === e) {
                  l(), c(), (r += 1)
                  continue
                }
                if ('/' === e && '*' === t.charAt(r + 1)) {
                  ;(a = !0), (r += 2)
                  continue
                }
              }
              ;(i += e), (r += 1)
            }
          }
        })(t)).length,
          e = 0;
        e < n;
        e++
      )
        if (
          ((o = (s = i[e])[s.length - 1]),
          (r = o),
          (a.test(r) && 0 <= parseFloat(r)) ||
            l.test(r) ||
            '0' === r ||
            '-0' === r ||
            '+0' === r)
        ) {
          if (((o = o), s.pop(), 0 === s.length)) return o
          if (((s = s.join(' ')), y.matchesMedia(s))) return o
        }
      return '100vw'
    }
    function lt() {
      2 === N.width && (y.supSizes = !0),
        (u = y.supSrcset && !y.supSizes),
        (a = !0),
        setTimeout(nt)
    }
    function ct() {
      var t = o.readyState || ''
      ;(q = setTimeout(ct, 'loading' === t ? 200 : 999)),
        o.body && (y.fillImgs(), (U = U || X.test(t)) && clearTimeout(q))
    }
    function ut() {
      var t = new Date() - Y
      t < G ? (V = setTimeout(ut, G - t)) : ((V = null), Q())
    }
    t.console && console.warn,
      b in n || (b = 'src'),
      (m['image/jpeg'] = !0),
      (m['image/gif'] = !0),
      (m['image/png'] = !0),
      (m['image/svg+xml'] = o.implementation.hasFeature(
        'http://www.w3.org/TR/SVG11/feature#Image',
        '1.1'
      )),
      (y.ns = ('pf' + new Date().getTime()).substr(0, 9)),
      (y.supSrcset = 'srcset' in n),
      (y.supSizes = 'sizes' in n),
      (y.supPicture = !!t.HTMLPictureElement),
      y.supSrcset &&
        y.supPicture &&
        !y.supSizes &&
        ((j = o.createElement('img')),
        (n.srcset = 'data:,a'),
        (j.src = 'data:,a'),
        (y.supSrcset = n.complete === j.complete),
        (y.supPicture = y.supSrcset && y.supPicture)),
      y.supSrcset && !y.supSizes
        ? ((j =
            'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='),
          ((N = o.createElement('img')).onload = lt),
          (N.onerror = lt),
          N.setAttribute('sizes', '9px'),
          (N.srcset =
            j +
            ' 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w'),
          (N.src = j))
        : (a = !0),
      (y.selShort = 'picture>img,img[srcset]'),
      (y.sel = y.selShort),
      (y.cfg = _),
      (y.DPR = S || 1),
      (y.u = D),
      (y.types = m),
      (y.setSize = e),
      (y.makeUrl = g(function (t) {
        return (M.href = t), M.href
      })),
      (y.qsa = function (t, e) {
        return 'querySelector' in t ? t.querySelectorAll(e) : []
      }),
      (y.matchesMedia = function () {
        return (
          t.matchMedia && (matchMedia('(min-width: 0.1em)') || {}).matches
            ? (y.matchesMedia = function (t) {
                return !t || matchMedia(t).matches
              })
            : (y.matchesMedia = y.mMQ),
          y.matchesMedia.apply(this, arguments)
        )
      }),
      (y.mMQ = function (t) {
        return !t || it(t)
      }),
      (y.calcLength = function (t) {
        t = it(t, !0) || !1
        return (t = t < 0 ? !1 : t)
      }),
      (y.supportsType = function (t) {
        return !t || m[t]
      }),
      (y.parseSize = g(function (t) {
        t = (t || '').match(v)
        return { media: t && t[1], length: t && t[2] }
      })),
      (y.parseSet = function (t) {
        return t.cands || (t.cands = rt(t.srcset, t)), t.cands
      }),
      (y.getEmValue = function () {
        var t, e, i, n
        return (
          !s &&
            (t = o.body) &&
            ((e = o.createElement('div')),
            (i = l.style.cssText),
            (n = t.style.cssText),
            (e.style.cssText =
              'position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)'),
            (l.style.cssText = T),
            (t.style.cssText = T),
            t.appendChild(e),
            (s = e.offsetWidth),
            t.removeChild(e),
            (s = parseFloat(s, 10)),
            (l.style.cssText = i),
            (t.style.cssText = n)),
          s || 16
        )
      }),
      (y.calcListLength = function (t) {
        var e
        return (
          (t in I && !_.uT) ||
            ((e = y.calcLength(at(t))), (I[t] = e || D.width)),
          I[t]
        )
      }),
      (y.setRes = function (t) {
        if (t)
          for (var e, i = 0, n = (e = y.parseSet(t)).length; i < n; i++)
            $(e[i], t.sizes)
        return e
      }),
      (y.setRes.res = $),
      (y.applySetCandidate = function (t, e) {
        if (t.length) {
          var i,
            n,
            s,
            o,
            r,
            a,
            l,
            c,
            u,
            h,
            d,
            p,
            m,
            A,
            f = e[y.ns],
            g = y.DPR,
            w = f.curSrc || e[b],
            v =
              f.curCan ||
              ((l = e),
              (c = w),
              (v = t[0].set),
              (v = ot(
                c,
                (v = !v && c ? (v = l[y.ns].sets) && v[v.length - 1] : v)
              )) &&
                ((c = y.makeUrl(c)),
                (l[y.ns].curSrc = c),
                (l[y.ns].curCan = v).res || $(v, v.set.sizes)),
              v)
          if (
            (v &&
              v.set === t[0].set &&
              ((a = x && !e.complete && v.res - 0.1 > g) ||
                ((v.cached = !0), v.res >= g && (r = v))),
            !r)
          )
            for (t.sort(st), r = t[(o = t.length) - 1], n = 0; n < o; n++)
              if ((i = t[n]).res >= g) {
                r =
                  t[(s = n - 1)] &&
                  (a || w !== y.makeUrl(i.url)) &&
                  ((u = t[s].res),
                  (h = i.res),
                  (d = g),
                  (p = t[s].cached),
                  (A = m = void 0),
                  (u =
                    'saveData' === _.algorithm
                      ? 2.7 < u
                        ? d + 1
                        : ((A = (h - d) * (m = Math.pow(u - 0.6, 1.5))),
                          p && (A += 0.1 * m),
                          u + A)
                      : 1 < d
                      ? Math.sqrt(u * h)
                      : u),
                  d < u)
                    ? t[s]
                    : i
                break
              }
          r &&
            ((v = y.makeUrl(r.url)),
            (f.curSrc = v),
            (f.curCan = r),
            v !== w && y.setSrc(e, r),
            y.setSize(e))
        }
      }),
      (y.setSrc = function (t, e) {
        ;(t.src = e.url),
          'image/svg+xml' === e.set.type &&
            ((e = t.style.width),
            (t.style.width = t.offsetWidth + 1 + 'px'),
            t.offsetWidth + 1 && (t.style.width = e))
      }),
      (y.getSet = function (t) {
        for (var e, i, n = !1, s = t[y.ns].sets, o = 0; o < s.length && !n; o++)
          if (
            (e = s[o]).srcset &&
            y.matchesMedia(e.media) &&
            (i = y.supportsType(e.type))
          ) {
            n = e = 'pending' === i ? i : e
            break
          }
        return n
      }),
      (y.parseSets = function (t, e, i) {
        var n,
          s,
          o,
          r,
          a = e && 'PICTURE' === e.nodeName.toUpperCase(),
          l = t[y.ns]
        ;(l.src !== c && !i.src) ||
          ((l.src = h.call(t, 'src')),
          l.src ? d.call(t, A, l.src) : p.call(t, A)),
          (l.srcset !== c && !i.srcset && y.supSrcset && !t.srcset) ||
            ((n = h.call(t, 'srcset')), (l.srcset = n), (r = !0)),
          (l.sets = []),
          a &&
            ((l.pic = !0),
            (function (t, e) {
              for (
                var i,
                  n,
                  s = t.getElementsByTagName('source'),
                  o = 0,
                  r = s.length;
                o < r;
                o++
              )
                ((i = s[o])[y.ns] = !0),
                  (n = i.getAttribute('srcset')) &&
                    e.push({
                      srcset: n,
                      media: i.getAttribute('media'),
                      type: i.getAttribute('type'),
                      sizes: i.getAttribute('sizes'),
                    })
            })(e, l.sets)),
          l.srcset
            ? ((s = { srcset: l.srcset, sizes: h.call(t, 'sizes') }),
              l.sets.push(s),
              (o = (u || l.src) && w.test(l.srcset || '')) ||
                !l.src ||
                ot(l.src, s) ||
                s.has1x ||
                ((s.srcset += ', ' + l.src),
                s.cands.push({ url: l.src, d: 1, set: s })))
            : l.src && l.sets.push({ srcset: l.src, sizes: null }),
          (l.curCan = null),
          (l.curSrc = c),
          (l.supported = !(a || (s && !y.supSrcset) || (o && !y.supSizes))),
          r &&
            y.supSrcset &&
            !l.supported &&
            (n ? (d.call(t, f, n), (t.srcset = '')) : p.call(t, f)),
          l.supported &&
            !l.srcset &&
            ((!l.src && t.src) || t.src !== y.makeUrl(l.src)) &&
            (null === l.src ? t.removeAttribute('src') : (t.src = l.src)),
          (l.parsed = !0)
      }),
      (y.fillImg = function (t, e) {
        var i,
          n = e.reselect || e.reevaluate
        t[y.ns] || (t[y.ns] = {}),
          (i = t[y.ns]),
          (!n && i.evaled === r) ||
            ((i.parsed && !e.reevaluate) || y.parseSets(t, t.parentNode, e),
            i.supported
              ? (i.evaled = r)
              : ((e = t),
                (i = y.getSet(e)),
                (t = !1),
                'pending' !== i &&
                  ((t = r),
                  i && ((i = y.setRes(i)), y.applySetCandidate(i, e))),
                (e[y.ns].evaled = t)))
      }),
      (y.setupRun = function () {
        ;(z && !E && S === t.devicePixelRatio) ||
          ((E = !1),
          (S = t.devicePixelRatio),
          (k = {}),
          (I = {}),
          (y.DPR = S || 1),
          (D.width = Math.max(t.innerWidth || 0, l.clientWidth)),
          (D.height = Math.max(t.innerHeight || 0, l.clientHeight)),
          (D.vw = D.width / 100),
          (D.vh = D.height / 100),
          (r = [D.height, D.width, S].join('-')),
          (D.em = y.getEmValue()),
          (D.rem = D.em))
      }),
      y.supPicture
        ? ((nt = e), (y.fillImg = e))
        : ((X = t.attachEvent ? /d$|^c/ : /d$|^c|^i/),
          (q = setTimeout(ct, o.body ? 9 : 99)),
          (K = l.clientHeight),
          i(
            t,
            'resize',
            ((Q = function () {
              ;(E =
                Math.max(t.innerWidth || 0, l.clientWidth) !== D.width ||
                l.clientHeight !== K),
                (K = l.clientHeight),
                E && y.fillImgs()
            }),
            (G = 99),
            function () {
              ;(Y = new Date()), (V = V || setTimeout(ut, G))
            })
          ),
          i(o, 'readystatechange', ct)),
      (y.picturefill = nt),
      (y.fillImgs = nt),
      (y.teardownRun = e),
      (nt._ = y),
      (t.picturefillCFG = {
        pf: y,
        push: function (t) {
          var e = t.shift()
          'function' == typeof y[e]
            ? y[e].apply(y, t)
            : ((_[e] = t[0]), z && y.fillImgs({ reselect: !0 }))
        },
      })
    for (; C && C.length; ) t.picturefillCFG.push(C.shift())
    ;(t.picturefill = nt),
      'object' == typeof module && 'object' == typeof module.exports
        ? (module.exports = nt)
        : 'function' == typeof define &&
          define.amd &&
          define('picturefill', function () {
            return nt
          }),
      y.supPicture ||
        (m['image/webp'] =
          ((J = 'image/webp'),
          (tt =
            'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=='),
          ((et = new t.Image()).onerror = function () {
            ;(m[J] = !1), nt()
          }),
          (et.onload = function () {
            ;(m[J] = 1 === et.width), nt()
          }),
          (et.src = tt),
          'pending'))
  })(window, document),
  function () {
    var D = this.jQuery || window.jQuery,
      M = D(window)
    D.fn.stick_in_parent = function (t) {
      var x,
        e,
        s,
        i,
        n,
        o,
        b = (t = null == t ? {} : t).sticky_class,
        C = t.inner_scrolling,
        T = t.recalc_every,
        E = t.parent,
        k = t.offset_top,
        I = t.spacer,
        S = t.bottoming
      for (
        null == k && (k = 0),
          null == E && (E = void 0),
          null == C && (C = !0),
          null == b && (b = 'is_stuck'),
          x = D(document),
          null == S && (S = !0),
          s = function (t) {
            var e, i
            return window.getComputedStyle
              ? (t[0],
                (e = window.getComputedStyle(t[0])),
                (i =
                  parseFloat(e.getPropertyValue('width')) +
                  parseFloat(e.getPropertyValue('margin-left')) +
                  parseFloat(e.getPropertyValue('margin-right'))),
                'border-box' !== e.getPropertyValue('box-sizing') &&
                  (i +=
                    parseFloat(e.getPropertyValue('border-left-width')) +
                    parseFloat(e.getPropertyValue('border-right-width')) +
                    parseFloat(e.getPropertyValue('padding-left')) +
                    parseFloat(e.getPropertyValue('padding-right'))),
                i)
              : t.outerWidth(!0)
          },
          i = function (o, r, a, l, c, u, h, d) {
            var p, t, m, A, f, g, w, v, e, y, _, n
            if (!o.data('sticky_kit')) {
              if (
                (o.data('sticky_kit', !0),
                (f = x.height()),
                (w = o.parent()),
                !(w = null != E ? w.closest(E) : w).length)
              )
                throw 'failed to find stick parent'
              if (
                ((p = m = !1),
                (_ = null != I ? I && o.closest(I) : D('<div />')) &&
                  _.css('position', o.css('position')),
                (v = function () {
                  var t, e, i
                  if (!d)
                    return (
                      (f = x.height()),
                      (t = parseInt(w.css('border-top-width'), 10)),
                      (e = parseInt(w.css('padding-top'), 10)),
                      (r = parseInt(w.css('padding-bottom'), 10)),
                      (a = w.offset().top + t + e),
                      (l = w.height()),
                      m &&
                        ((p = m = !1),
                        null == I && (o.insertAfter(_), _.detach()),
                        o
                          .css({ position: '', top: '', width: '', bottom: '' })
                          .removeClass(b),
                        (i = !0)),
                      (c =
                        o.offset().top -
                        (parseInt(o.css('margin-top'), 10) || 0) -
                        k),
                      (u = o.outerHeight(!0)),
                      (h = o.css('float')),
                      _ &&
                        _.css({
                          width: s(o),
                          height: u,
                          display: o.css('display'),
                          'vertical-align': o.css('vertical-align'),
                          float: h,
                        }),
                      i ? n() : void 0
                    )
                })(),
                u !== l)
              )
                return (
                  (A = void 0),
                  (g = k),
                  (y = T),
                  (n = function () {
                    var t, e, i, n, s
                    if (!d)
                      return (
                        (i = !1),
                        null != y && --y <= 0 && ((y = T), v(), (i = !0)),
                        i || x.height() === f || (v(), (i = !0)),
                        (i = M.scrollTop()),
                        null != A && (e = i - A),
                        (A = i),
                        m
                          ? (S &&
                              ((n = l + a < i + u + g),
                              p &&
                                !n &&
                                ((p = !1),
                                o
                                  .css({
                                    position: 'fixed',
                                    bottom: '',
                                    top: g,
                                  })
                                  .trigger('sticky_kit:unbottom'))),
                            i < c &&
                              ((m = !1),
                              (g = k),
                              null == I &&
                                (('left' !== h && 'right' !== h) ||
                                  o.insertAfter(_),
                                _.detach()),
                              o
                                .css((t = { position: '', width: '', top: '' }))
                                .removeClass(b)
                                .trigger('sticky_kit:unstick')),
                            C &&
                              (s = M.height()) < u + k &&
                              (p ||
                                ((g -= e),
                                (g = Math.max(s - u, g)),
                                (g = Math.min(k, g)),
                                m && o.css({ top: g + 'px' }))))
                          : c < i &&
                            ((m = !0),
                            ((t = { position: 'fixed', top: g }).width =
                              'border-box' === o.css('box-sizing')
                                ? o.outerWidth() + 'px'
                                : o.width() + 'px'),
                            o.css(t).addClass(b),
                            null == I &&
                              (o.after(_),
                              ('left' !== h && 'right' !== h) || _.append(o)),
                            o.trigger('sticky_kit:stick')),
                        m &&
                        S &&
                        (null == n && (n = l + a < i + u + g), !p && n)
                          ? ((p = !0),
                            'static' === w.css('position') &&
                              w.css({ position: 'relative' }),
                            o
                              .css({
                                position: 'absolute',
                                bottom: r,
                                top: 'auto',
                              })
                              .trigger('sticky_kit:bottom'))
                          : void 0
                      )
                  }),
                  (e = function () {
                    if (
                      !(
                        document.fullscreenElement ||
                        document.mozFullScreenElement ||
                        document.webkitFullscreenElement ||
                        document.msFullscreenElement
                      )
                    )
                      return v(), n()
                  }),
                  (t = function () {
                    if (
                      ((d = !0),
                      M.off('touchmove', n),
                      M.off('scroll', n),
                      M.off('resize', e),
                      D(document.body).off('sticky_kit:recalc', e),
                      o.off('sticky_kit:detach', t),
                      o.removeData('sticky_kit'),
                      o.css({ position: '', bottom: '', top: '', width: '' }),
                      w.position('position', ''),
                      m)
                    )
                      return (
                        null == I &&
                          (('left' !== h && 'right' !== h) || o.insertAfter(_),
                          _.remove()),
                        o.removeClass(b)
                      )
                  }),
                  M.on('touchmove', n),
                  M.on('scroll', n),
                  M.on('resize', e),
                  D(document.body).on('sticky_kit:recalc', e),
                  o.on('sticky_kit:detach', t),
                  setTimeout(n, 0)
                )
            }
          },
          n = 0,
          o = this.length;
        n < o;
        n++
      )
        (e = this[n]), i(D(e))
      return this
    }
  }.call(this),
  (function (a) {
    'use strict'
    var r = {
      settings: { admin_bar: { height: 0, position: '' } },
      init: function () {
        this.admin_bar_check(),
          this.sticky_sidebar(),
          this.accordion_widget(),
          this.sticky_header(),
          this.fit_vids(),
          this.sliders(),
          this.instagram_slider(),
          this.responsive_sidebar(),
          this.header_action_search(),
          this.init_load_more_click(),
          this.init_infinite_scroll(),
          this.scroll_push_state(),
          this.scroll_animate(),
          this.gutenberg_gallery(),
          this.popup(),
          this.reverse_menu(),
          this.start_kenburns(),
          this.object_fit_fix(),
          this.video_fallback_image(),
          this.animate_counters(),
          this.cover_image_parallax(),
          this.align_full_fix(),
          this.switcher()
      },
      resize: function () {
        this.admin_bar_check(), this.sticky_sidebar(), this.align_full_fix()
      },
      scroll: function () {},
      admin_bar_check: function () {
        a('#wpadminbar').length &&
          a('#wpadminbar').is(':visible') &&
          ((this.settings.admin_bar.height = a('#wpadminbar').height()),
          (this.settings.admin_bar.position = a('#wpadminbar').css('position')))
      },
      switcher: function () {
        a('#switcher_link, .switcher_close').click(function (t) {
          t.preventDefault(), a('#switcher_wrap').toggleClass('switcher_moved')
        }),
          a('#switcher_wrap').hasClass('lazy_open') &&
            setTimeout(function () {
              a('#switcher_wrap').hasClass('switcher_moved') &&
                a('#switcher_link').click()
            }, 7e3),
          a('#show-rtl').change(function () {
            a(this).is(':checked')
              ? a('head').append(
                  '<link media="all" type="text/css" href="' +
                    a(this).attr('data-url') +
                    '" id="travell-rtl-css-custom" rel="stylesheet">'
                )
              : a('#travell-rtl-css-custom').remove()
          })
      },
      sticky_sidebar: function () {
        a('.travell-sidebar-sticky').length &&
          a('body').imagesLoaded(function () {
            var t = a('.travell-sidebar-sticky'),
              i = window.matchMedia('(min-width: 1260px)').matches ? 50 : 30
            t.each(function () {
              var t = a(this).parent().hasClass('travell-sidebar-mini')
                  ? 730
                  : 1024,
                e =
                  (a('.travell-header-sticky').length &&
                  !travell_js_settings.header_sticky_up
                    ? a('.travell-header-sticky').outerHeight()
                    : 0) +
                  ('fixed' == r.settings.admin_bar.position
                    ? r.settings.admin_bar.height
                    : 0) +
                  i
              window.matchMedia('(min-width: ' + t + 'px)').matches
                ? a(this).stick_in_parent({
                    inner_scrolling: !0,
                    offset_top: e,
                  })
                : (a(this).css('height', 'auto'),
                  a(this).css('min-height', '1px'),
                  a(this).trigger('sticky_kit:detach'))
            })
          })
      },
      accordion_widget: function () {
        a('.widget').each(function () {
          a(this)
            .find(
              '.menu-item-has-children > a, .page_item_has_children > a, .cat-parent > a'
            )
            .after(
              '<span class="travell-accordion-nav"><i class="o-angle-down-1"></i></span>'
            )
        }),
          a('.widget').on('click', '.travell-accordion-nav', function () {
            a(this)
              .next('ul.sub-menu:first, ul.children:first')
              .slideToggle('fast')
              .parent()
              .toggleClass('active')
          })
      },
      responsive_sidebar: function () {
        a('body').on('click', '.travell-hamburger', function () {
          a('body').addClass('travell-sidebar-action-open travell-lock')
          var t =
            'fixed' == r.settings.admin_bar.position ||
            0 == a(window).scrollTop()
              ? r.settings.admin_bar.height
              : 0
          a('.travell-sidebar').css('top', t)
        }),
          a('body').on(
            'click',
            '.travell-action-close, .travell-body-overlay',
            function () {
              a('body').removeClass('travell-sidebar-action-open travell-lock')
            }
          ),
          a(document).keyup(function (t) {
            27 == t.keyCode &&
              a('body').hasClass('travell-sidebar-action-open') &&
              a('body').removeClass('travell-sidebar-action-open travell-lock')
          })
        var t = a('.travell-sidebar .widget:not(.travell-responsive-nav)'),
          e = a(
            '.travell-sidebar .widget.widget-no-padding:not(.travell-responsive-nav)'
          )
        t.length == e.length &&
          0 != t.length &&
          a('.travell-responsive-nav').addClass('widget-no-padding')
      },
      header_action_search: function () {
        a('body').on('click', '.travell-action-search span', function () {
          a(this).find('i').toggleClass('o-exit-1', 'o-search-1'),
            a(this).closest('.travell-action-search').toggleClass('active'),
            setTimeout(function () {
              a('.active input[type="text"]').focus()
            }, 150)
        }),
          a(document).on('click', function (t) {
            !a(t.target).is('.travell-action-search span') &&
              a(window).width() < 580 &&
              a('.travell-action-search.active .sub-menu').css(
                'width',
                a(window).width()
              )
          })
      },
      sticky_header: function () {
        var i = a('.travell-header-sticky')
        if (l(i)) return !1
        var n = 0
        a(window).scroll(function () {
          var t = a(window).scrollTop(),
            e =
              'fixed' == r.settings.admin_bar.position
                ? r.settings.admin_bar.height
                : 0
          travell_js_settings.header_sticky_up
            ? t < n && t >= travell_js_settings.header_sticky_offset
              ? r.show_sticky_header(i, e)
              : r.hide_sticky_header(i)
            : t >= travell_js_settings.header_sticky_offset
            ? r.show_sticky_header(i, e)
            : r.hide_sticky_header(i),
            (n = t)
        })
      },
      fit_vids: function () {
        a(
          '.travell-entry, .widget, .travell-cover > .container, .travell-custom-content'
        ).fitVids({
          customSelector: [
            "iframe[src*='youtube.com/embed']",
            "iframe[src*='player.vimeo.com/video']",
            "iframe[src*='kickstarter.com/projects']",
            "iframe[src*='players.brightcove.net']",
            "iframe[src*='hulu.com/embed']",
            "iframe[src*='vine.co/v']",
            "iframe[src*='videopress.com/embed']",
            "iframe[src*='dailymotion.com/embed']",
            "iframe[src*='vid.me/e']",
            "iframe[src*='player.twitch.tv']",
            "iframe[src*='facebook.com/plugins/video.php']",
            "iframe[src*='gfycat.com/ifr/']",
            "iframe[src*='liveleak.com/ll_embed']",
            "iframe[src*='media.myspace.com']",
            "iframe[src*='archive.org/embed']",
            "iframe[src*='w.soundcloud.com/player']",
            "iframe[src*='channel9.msdn.com']",
            "iframe[src*='content.jwplatform.com']",
            "iframe[src*='wistia.com']",
            "iframe[src*='vooplayer.com']",
            "iframe[src*='content.zetatv.com.uy']",
            "iframe[src*='embed.wirewax.com']",
            "iframe[src*='eventopedia.navstream.com']",
            "iframe[src*='cdn.playwire.com']",
            "iframe[src*='drive.google.com']",
            "iframe[src*='videos.sproutvideo.com']",
          ].join(','),
          ignore: '[class^="wp-block"]',
        })
      },
      show_sticky_header: function (t, e) {
        ;(t = l(e) ? 0 : t).hasClass('active') ||
          (t.css('top', e), t.addClass('active'))
      },
      hide_sticky_header: function (t) {
        t.hasClass('active') && t.removeClass('active')
      },
      sliders: function () {
        a('body').imagesLoaded(function () {
          a(
            '.travell-cover-gallery .gallery, .travell-cover-slider, .gallery.gallery-columns-1, .wp-block-gallery.columns-1, .travell-cover-gallery .wp-block-gallery'
          ).each(function () {
            var t,
              e,
              i = a(this)
            ;(!i.hasClass('travell-cover-slider') &&
              l(travell_js_settings.use_gallery)) ||
              (i.hasClass('owl-carousel') || i.addClass('owl-carousel'),
              (t = l(
                (e = i.hasClass('wp-block-gallery')
                  ? i.attr('class').match(/columns-(\d+)/)
                  : i.attr('class').match(/gallery-columns-(\d+)/))
              )
                ? 1
                : e[1]),
              (e = !1),
              i.hasClass('travell-cover-slider') &&
                (e = !!travell_js_settings.home_slider_autoplay),
              i.owlCarousel({
                rtl: !!travell_js_settings.rtl_mode,
                loop: !0,
                nav: !0,
                autoWidth: !1,
                autoHeight: !0,
                autoplay: e,
                autoplayTimeout:
                  1e3 * parseInt(travell_js_settings.home_slider_autoplay_time),
                autoplayHoverPause: !0,
                center: !1,
                fluidSpeed: 300,
                margin: 0,
                items: t,
                navText: [
                  '<i class="o-angle-left-1"></i>',
                  '<i class="o-angle-right-1"></i>',
                ],
                responsive: {
                  0: { items: 1 == t ? 1 : 2 },
                  729: { items: 1 == t ? 1 : 3 },
                  1024: { items: 1 == t ? 1 : 4 },
                  1200: { items: t },
                },
              }))
          })
        })
      },
      instagram_slider: function () {
        var t = a('.travell-pre-footer .meks-instagram-widget')
        t.length &&
          (t.hasClass('owl-carousel') || t.addClass('owl-carousel'),
          t.owlCarousel({
            rtl: !!travell_js_settings.rtl_mode,
            loop: !0,
            nav: !0,
            autoWidth: !1,
            center: !0,
            fluidSpeed: 300,
            margin: 0,
            items: 5,
            navText: [
              '<i class="o-angle-left-1"></i>',
              '<i class="o-angle-right-1"></i>',
            ],
            lazyLoad: !0,
            responsive: {
              0: { items: 2 },
              729: { items: 3 },
              1024: { items: 4 },
              1200: { items: 5 },
            },
          }))
      },
      gutenberg_gallery: function () {
        var t
        l(travell_js_settings.use_gallery) ||
          ((t = a('.wp-block-gallery')).length &&
            a('body').imagesLoaded(function () {
              var i = document.querySelectorAll('.wp-block-gallery img')
              t.find('a').each(function (t) {
                var e = i[t].naturalWidth,
                  t = i[t].naturalHeight
                a(this).attr('data-size', JSON.stringify({ w: e, h: t }))
              })
            }))
      },
      popup: function () {
        a('body').on(
          'click',
          '.gallery-item a, a.travell-popup-img, .wp-block-gallery a',
          function (t) {
            if (
              a(this).hasClass('travell-popup-img') ||
              !l(travell_js_settings.use_gallery)
            ) {
              t.preventDefault()
              var e = document.querySelectorAll('.pswp')[0],
                i = [],
                n = 0,
                s = a(this),
                o = !!s
                  .closest('.gallery, .wp-block-gallery')
                  .hasClass('owl-carousel'),
                t = [],
                r = !s.hasClass('travell-popup-img')
              if (
                l(
                  (t = r
                    ? o
                      ? a(this)
                          .closest('.gallery, .wp-block-gallery')
                          .find(
                            '.owl-item:not(.cloned) .gallery-item a, .owl-item:not(.cloned) .blocks-gallery-item a'
                          )
                      : a(this)
                          .closest('.gallery, .wp-block-gallery')
                          .find('.gallery-item a, .blocks-gallery-item a')
                    : a('a.travell-popup-img'))
                )
              )
                return !0
              a.each(t, function (t) {
                s.attr('href') == a(this).attr('href') && (n = t)
                ;(t = JSON.parse(a(this).attr('data-size'))),
                  (t = {
                    src: a(this).attr('href'),
                    w: t.w,
                    h: t.h,
                    title: (r
                      ? a(this).closest('.gallery-item, .blocks-gallery-item')
                      : a(this).closest('figure.wp-caption')
                    )
                      .find('figcaption')
                      .html(),
                  })
                i.push(t)
              }),
                new PhotoSwipe(e, PhotoSwipeUI_Default, i, {
                  history: !1,
                  index: n,
                  preload: [2, 2],
                  captionEl: !0,
                  fullscreenEl: !1,
                  zoomEl: !1,
                  shareEl: !1,
                  preloaderEl: !0,
                }).init()
            }
          }
        )
      },
      reverse_menu: function () {
        a('.travell-header').on('mouseenter', 'ul li', function (t) {
          a(this).find('ul').length &&
            a(window).width() -
              (a(this).find('ul').offset().left +
                a(this).find('ul').outerWidth()) <
              0 &&
            a(this).find('ul').addClass('travell-rev')
        })
      },
      init_load_more_click: function () {
        a('body').on('click', '.load-more > a', function (t) {
          t.preventDefault()
          t = a(this).attr('href')
          l(t) ||
            r.load_more(
              { url: t, elem_with_new_url: '.load-more > a' },
              function () {}
            )
        })
      },
      init_infinite_scroll: function () {
        var e
        l(a('.travell-pagination .travell-infinite-scroll')) ||
          ((e = !0),
          a(window).scroll(function () {
            var t = a('.travell-pagination')
            l(t) ||
              (e &&
                a(this).scrollTop() > t.offset().top - a(this).height() - 200 &&
                ((e = !1),
                (t = a('.travell-pagination .travell-infinite-scroll a').attr(
                  'href'
                )),
                r.load_more(
                  { url: t, elem_with_new_url: '.travell-infinite-scroll a' },
                  function () {
                    e = !0
                  }
                )))
          }))
      },
      load_more: function (t, s) {
        var e, o
        l(t)
          ? console.error("Args can't be empty")
          : (r.toggle_pagination_loader(),
            (e = {
              url: window.location.href,
              container: '.travell-posts',
              elem_with_new_url: '.load-more > a',
              attr_with_new_url: 'href',
            }),
            l((o = a.extend({}, e, t)).url) &&
              console.error('You must provide url to next page'),
            a('<div>').load(o.url, function () {
              var t = a(this),
                e = t.find(o.elem_with_new_url).attr(o.attr_with_new_url),
                i = t.find('title').text(),
                n = t.find(o.container).children()
              n.imagesLoaded(function () {
                var t
                n.hide().appendTo('.travell-posts:last').fadeIn(),
                  window.location.href !== e
                    ? (l(e)
                        ? a(o.elem_with_new_url)
                            .closest('.travell-pagination')
                            .fadeOut('fast')
                            .remove()
                        : a(o.elem_with_new_url).attr(o.attr_with_new_url, e),
                      (t = {
                        prev: window.location.href,
                        next: o.url,
                        offset: a(window).scrollTop(),
                        prev_title: window.document.title,
                        next_title: i,
                      }),
                      r.push_state(t),
                      'function' == typeof s && s(!0))
                    : (a(o.elem_with_new_url)
                        .closest('.travell-pagination')
                        .fadeOut('fast')
                        .remove(),
                      'function' == typeof s && s(!1)),
                  r.toggle_pagination_loader(),
                  r.sticky_sidebar()
              })
            }))
      },
      toggle_pagination_loader: function () {
        a('.travell-pagination').toggleClass('travell-loader-active')
      },
      push_state: function (t) {
        var e = {
            prev: window.location.href,
            next: '',
            offset: a(window).scrollTop(),
            prev_title: window.document.title,
            next_title: window.document.title,
            increase_counter: !0,
          },
          t = a.extend({}, e, t)
        t.increase_counter && (r.pushes.up++, r.pushes.down++),
          delete t.increase_counter,
          r.pushes.url.push(t),
          (window.document.title = t.next_title),
          window.history.pushState(t, '', t.next)
      },
      pushes: { url: [], up: 0, down: 0 },
      scroll_push_state: function () {
        var t, e
        ;(l(a('.travell-pagination .load-more a')) &&
          l(a('.travell-pagination .travell-infinite-scroll'))) ||
          (r.push_state({ increase_counter: !1 }),
          (e = 0),
          a(window).scroll(function () {
            r.pushes.url[r.pushes.up].offset !== t &&
              a(window).scrollTop() < r.pushes.url[r.pushes.up].offset &&
              ((t = r.pushes.url[r.pushes.up].offset),
              (e = 0),
              (window.document.title = r.pushes.url[r.pushes.up].prev_title),
              window.history.replaceState(
                r.pushes.url,
                '',
                r.pushes.url[r.pushes.up].prev
              ),
              (r.pushes.down = r.pushes.up),
              0 !== r.pushes.up && r.pushes.up--),
              r.pushes.url[r.pushes.down].offset !== e &&
                a(window).scrollTop() > r.pushes.url[r.pushes.down].offset &&
                ((e = r.pushes.url[r.pushes.down].offset),
                (t = 0),
                (window.document.title =
                  r.pushes.url[r.pushes.down].next_title),
                window.history.replaceState(
                  r.pushes.url,
                  '',
                  r.pushes.url[r.pushes.down].next
                ),
                (r.pushes.up = r.pushes.down),
                r.pushes.down < r.pushes.url.length - 1 && r.pushes.down++)
          }))
      },
      scroll_animate: function () {
        a('body').on('click', '.travell-scroll-animate', function (t) {
          t.preventDefault()
          var e = this.hash,
            i = a(e),
            t = travell_js_settings.header_sticky
              ? a('.travell-header-sticky').height()
              : 0
          a('html, body')
            .stop()
            .animate(
              { scrollTop: i.offset().top - t },
              900,
              'swing',
              function () {
                window.location.hash = e
              }
            )
        })
      },
      start_kenburns: function () {
        if (window.matchMedia('(max-width: 439px)').matches) return !1
        a('body').imagesLoaded(function () {
          a('body.travell-animation-kenburns').addClass(
            'travell-animation-kenburns-start'
          )
        })
      },
      object_fit_fix: function () {
        a('body').imagesLoaded(function () {
          objectFitImages('.travell-item a.entry-image img,.travell-cover img')
        })
      },
      video_fallback_image: function () {
        travell_js_settings.home_cover_video_image_fallback &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) &&
          this.is_autoplay_supported(function (t) {
            t ||
              (a('.travell-cover-video-item video').css('display', 'none'),
              a('.travell-cover-video-item .travell-fallback-video-image').css(
                'display',
                'block'
              ))
          })
      },
      is_autoplay_supported: function (t) {
        if ('function' != typeof t)
          return (
            console.log('is_autoplay_supported: Callback must be a function!'),
            !1
          )
        var e
        sessionStorage.autoplay_supported
          ? 'true' === sessionStorage.autoplay_supported
            ? t(!0)
            : t(!1)
          : (((e = document.createElement('video')).autoplay = !0),
            (e.src =
              'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJtcDQxaXNvbWF2YzEAAATKbW9vdgAAAGxtdmhkAAAAANLEP5XSxD+VAAB1MAAAdU4AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAACFpb2RzAAAAABCAgIAQAE////9//w6AgIAEAAAAAQAABDV0cmFrAAAAXHRraGQAAAAH0sQ/ldLEP5UAAAABAAAAAAAAdU4AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAoAAAAFoAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAHVOAAAH0gABAAAAAAOtbWRpYQAAACBtZGhkAAAAANLEP5XSxD+VAAB1MAAAdU5VxAAAAAAANmhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABMLVNNQVNIIFZpZGVvIEhhbmRsZXIAAAADT21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAw9zdGJsAAAAwXN0c2QAAAAAAAAAAQAAALFhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAoABaABIAAAASAAAAAAAAAABCkFWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAOGF2Y0MBZAAf/+EAHGdkAB+s2UCgL/lwFqCgoKgAAB9IAAdTAHjBjLABAAVo6+yyLP34+AAAAAATY29scm5jbHgABQAFAAUAAAAAEHBhc3AAAAABAAAAAQAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAAQBjdHRzAAAAAAAAAB4AAAABAAAH0gAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAB9IAAAAUc3RzcwAAAAAAAAABAAAAAQAAACpzZHRwAAAAAKaWlpqalpaampaWmpqWlpqalpaampaWmpqWlpqalgAAABxzdHNjAAAAAAAAAAEAAAABAAAAHgAAAAEAAACMc3RzegAAAAAAAAAAAAAAHgAAA5YAAAAVAAAAEwAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABRzdGNvAAAAAAAAAAEAAAT6AAAAGHNncGQBAAAAcm9sbAAAAAIAAAAAAAAAHHNiZ3AAAAAAcm9sbAAAAAEAAAAeAAAAAAAAAAhmcmVlAAAGC21kYXQAAAMfBgX///8b3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMTEgNzU5OTIxMCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTUgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xMSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgc3RpdGNoYWJsZT0xIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PWluZmluaXRlIGtleWludF9taW49Mjkgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz0ycGFzcyBtYnRyZWU9MSBiaXRyYXRlPTExMiByYXRldG9sPTEuMCBxY29tcD0wLjYwIHFwbWluPTUgcXBtYXg9NjkgcXBzdGVwPTQgY3BseGJsdXI9MjAuMCBxYmx1cj0wLjUgdmJ2X21heHJhdGU9ODI1IHZidl9idWZzaXplPTkwMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAG9liIQAFf/+963fgU3DKzVrulc4tMurlDQ9UfaUpni2SAAAAwAAAwAAD/DNvp9RFdeXpgAAAwB+ABHAWYLWHUFwGoHeKCOoUwgBAAADAAADAAADAAADAAAHgvugkks0lyOD2SZ76WaUEkznLgAAFFEAAAARQZokbEFf/rUqgAAAAwAAHVAAAAAPQZ5CeIK/AAADAAADAA6ZAAAADwGeYXRBXwAAAwAAAwAOmAAAAA8BnmNqQV8AAAMAAAMADpkAAAAXQZpoSahBaJlMCCv//rUqgAAAAwAAHVEAAAARQZ6GRREsFf8AAAMAAAMADpkAAAAPAZ6ldEFfAAADAAADAA6ZAAAADwGep2pBXwAAAwAAAwAOmAAAABdBmqxJqEFsmUwIK//+tSqAAAADAAAdUAAAABFBnspFFSwV/wAAAwAAAwAOmQAAAA8Bnul0QV8AAAMAAAMADpgAAAAPAZ7rakFfAAADAAADAA6YAAAAF0Ga8EmoQWyZTAgr//61KoAAAAMAAB1RAAAAEUGfDkUVLBX/AAADAAADAA6ZAAAADwGfLXRBXwAAAwAAAwAOmQAAAA8Bny9qQV8AAAMAAAMADpgAAAAXQZs0SahBbJlMCCv//rUqgAAAAwAAHVAAAAARQZ9SRRUsFf8AAAMAAAMADpkAAAAPAZ9xdEFfAAADAAADAA6YAAAADwGfc2pBXwAAAwAAAwAOmAAAABdBm3hJqEFsmUwIK//+tSqAAAADAAAdUQAAABFBn5ZFFSwV/wAAAwAAAwAOmAAAAA8Bn7V0QV8AAAMAAAMADpkAAAAPAZ+3akFfAAADAAADAA6ZAAAAF0GbvEmoQWyZTAgr//61KoAAAAMAAB1QAAAAEUGf2kUVLBX/AAADAAADAA6ZAAAADwGf+XRBXwAAAwAAAwAOmAAAAA8Bn/tqQV8AAAMAAAMADpkAAAAXQZv9SahBbJlMCCv//rUqgAAAAwAAHVE='),
            e.load(),
            (e.style.display = 'none'),
            (e.playing = !1),
            e.play(),
            (e.onplay = function () {
              this.playing = !0
            }),
            (e.oncanplay = function () {
              e.playing
                ? ((sessionStorage.autoplay_supported = 'true'), t(!0))
                : ((sessionStorage.autoplay_supported = 'false'), t(!1))
            }))
      },
      animate_counters: function () {
        var e, i
        !travell_js_settings.home_counter_animate ||
          (0 != (e = a('.travell-numbers')).length &&
            ((i = !0),
            a(window).scroll(function () {
              var t = e.offset().top - window.innerHeight
              i &&
                a(window).scrollTop() > t &&
                (a('.display-2').each(function () {
                  var t = a(this),
                    e = t.attr('data-count')
                  a({ count_start: 0 }).animate(
                    { count_start: e },
                    {
                      duration: 2e3,
                      easing: 'swing',
                      step: function () {
                        t.text(Math.floor(this.count_start))
                      },
                      complete: function () {
                        t.text(this.count_start)
                      },
                    }
                  )
                }),
                (i = !1))
            })))
      },
      cover_image_parallax: function () {
        travell_js_settings.cover_parallax &&
          a('.travell-parallax .travell-cover-item').css(
            'background-image',
            'url(' +
              a('.travell-parallax .travell-cover-item .entry-image img').attr(
                'src'
              ) +
              ')'
          )
      },
      align_full_fix: function () {
        var t
        a('body').hasClass('travell-sidebar-none') &&
          ((t =
            '.alignfull { width: ' +
            a(window).width() +
            'px; margin-left: -' +
            a(window).width() / 2 +
            'px; margin-right: -' +
            a(window).width() / 2 +
            'px; left:50%; right:50%; }'),
          a('#travell-align-fix').length
            ? a('#travell-align-fix').html(t)
            : a('head').append(
                '<style id="travell-align-fix" type="text/css">' +
                  t +
                  '</style>'
              ))
      },
    }
    function l(t) {
      return (
        void 0 === t ||
        null === t ||
        0 === t.length ||
        '' === t ||
        !('object' != typeof t || !a.isEmptyObject(t))
      )
    }
    a(document).ready(function () {
      r.init()
    }),
      a(window).resize(function () {
        r.resize()
      }),
      a(window).scroll(function () {
        r.scroll()
      })
  })(jQuery)
